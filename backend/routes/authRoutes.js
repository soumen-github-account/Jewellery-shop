
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

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false, }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login/failure" }),
  googleCallback
);


router.post("/signup", signup);

router.post("/login", login);

router.get("/login/failure", loginFailure);
router.get("/logout", logoutUser);
router.get("/user", getUser);
router.put("/update-user", updateUser);

router.post("/add-customer", addOrUpdateCustomer);
router.get("/get-customer", getCustomers);
router.get("/get-customer/:id", getCustomerById); 

export default router;
