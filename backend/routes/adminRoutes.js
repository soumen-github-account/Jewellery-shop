import express from 'express'
import { addOrder, deleteCategoryById, deleteOrderById, getCategoryById, getCategoryData, getOrder, saveCategoryData, updateCategoryById } from '../controllers/AdminController.js';
import upload from '../middlewares/multer.js';

const router = express.Router()

router.post("/save",  upload.single("image"), saveCategoryData);
router.get("/get", getCategoryData);
router.get("/get/:id", getCategoryById);
router.put("/update-category/:id", upload.single("image"), updateCategoryById);
router.delete("/delete-category/:id", deleteCategoryById);


router.post("/add-order", addOrder);
router.get("/get-orders", getOrder);
router.delete("/delete-order/:id", deleteOrderById);


export default router;