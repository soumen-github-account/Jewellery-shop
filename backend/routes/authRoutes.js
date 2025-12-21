// routes/authRoutes.js
import express from "express";
import passport from "../config/passport.js";
import {
  googleLogin,
  googleCallback,
  loginFailure,
  logoutUser,
  getUser,
  updateUser,
  signup,
  login,
  addOrUpdateCustomer,
  getCustomers,
  getCustomerById, 
} from "../controllers/authController.js";

const router = express.Router();

// ================= Google OAuth =================

// Step 1: Start Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false, }));

// Step 2: Google callback URL
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login/failure" }),
  googleCallback
);

// ================= Email/Password Authentication =================

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// ================= Other routes =================
router.get("/login/failure", loginFailure);
router.get("/logout", logoutUser);
router.get("/user", getUser);
router.put("/update-user", updateUser);

router.post("/add-customer", addOrUpdateCustomer);
router.get("/get-customer", getCustomers);
router.get("/get-customer/:id", getCustomerById); 

export default router;
