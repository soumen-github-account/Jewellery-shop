// server.js
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./config/passport.js";
import { connectDb } from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"


const app = express();
const port = process.env.PORT || 8000;

// Middleware

app.use(express.json());
app.use(cookieParser());

// CORS setup (frontend <-> backend communication)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Session setup (required for Passport + Google Auth)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "false", // production only true in prod (HTTPS)
      sameSite: "Lax", // required when frontend on different domain
      httpOnly: true,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

connectDb();

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/admin", adminRoutes)


app.listen(port, () => console.log(`Server running on port ${port}`));
