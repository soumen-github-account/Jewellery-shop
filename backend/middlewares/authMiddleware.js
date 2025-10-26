import jwt from "jsonwebtoken";

export const getUserIdFromToken = (req, res, next) => {
  // Priority: Passport session user (Google) -> JWT token
  if (req.user) {
    req.userId = req.user._id;
    return next();
  }

  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
