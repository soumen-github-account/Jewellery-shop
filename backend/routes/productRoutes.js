import express from "express";
import multer from "multer";
import { addProduct, getProductById, getProducts } from "../controllers/AdminController.js";
import { checkWishlist, editProduct, getWishlist, toggleWishlist } from "../controllers/productController.js";
import { getUserIdFromToken } from "../middlewares/authMiddleware.js";


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add-product", upload.array("images", 5), addProduct);
router.get("/get-product", getProducts);

router.post("/toggle", getUserIdFromToken, toggleWishlist);
router.get("/get", getUserIdFromToken, getWishlist);
router.get("/check/:productId", getUserIdFromToken, checkWishlist);

router.get("/get-product/:id", getProductById);
router.put("/edit-product/:id", upload.array("images", 5), editProduct);

export default router;