// controllers/authController.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import Customer from "../models/Customer.js";

// ================= Email/Password Signup =================
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",   // false for localhost
      sameSite: "None",    // Lax for localhost
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};

// ================= Email/Password Login =================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (!user.password)
      return res.status(400).json({ success: false, message: "Please login with Google" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Store JWT as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // "Production"
      sameSite: "None", // "None"
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};


// ================= Google Login Controllers =================
export const googleLogin = (req, res) => {
  res.send("Redirecting to Google...");
};

export const googleCallback = (req, res) => {
  // ✅ req.user is set by Passport session
  if (!req.user) return res.redirect(`${process.env.CLIENT_URL}/login`);

  // Optionally: issue a JWT for frontend
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.redirect(process.env.CLIENT_URL);
};


export const loginFailure = (req, res) => {
  res.status(401).json({ success: false, message: "Failed to authenticate with Google 😢" });
};

// controllers/authController.js

export const logoutUser = (req, res) => {
  req.logout(function(err) {
    if (err) return res.status(500).json({ success: false, message: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Passport session cookie
      res.clearCookie("token"); // JWT cookie
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    });
  });
};


export const getUser = async (req, res) => {
  try {
    if (req.user) {
      // Google user (via Passport session)
      return res.json({ success: true, user: req.user });
    }

    // JWT user
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, user: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.json({ success: false, user: null });

    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.json({ success: false, user: null });
  }
};

// ================= Update User =================
export const updateUser = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Not authenticated" });

    const { name, phone, addresses } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, addresses },
      { new: true }
    );

    return res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};



// Create a new customer
export const addOrUpdateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, due, check_no, productName, quantity, price } = req.body;

    let customer = await Customer.findOne({ phone });

    if (!customer) {
      // Create new customer
      customer = new Customer({
        name,
        email,
        phone,
        address,
        due,
        products: [{ check_no, productName, quantity, price }],
      });
    } else {
      // Update due if provided
      if (due !== undefined) customer.due = due;

      // Check if product already exists
      const existingProduct = customer.products.find(
        (p) => p.productName === productName
      );

      if (existingProduct) {
        // Update quantity & price if needed
        existingProduct.quantity += quantity;
        existingProduct.price = price; // optional, latest price
      } else {
        // Add new product to array
        customer.products.push({ check_no, productName, quantity, price });
      }
    }

    await customer.save();
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ _id: -1 });
    const count = await Customer.countDocuments();

    res.status(200).json({success: true, customers, count});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
