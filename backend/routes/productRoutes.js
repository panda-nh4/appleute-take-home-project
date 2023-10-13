import express from "express";
import { getProductsByCategory, listAllProducts, productDetails } from "../controllers/productController.js";

const router = express.Router();
router.get("/product", productDetails);
router.get("/category",getProductsByCategory)
router.get("/", listAllProducts);

export default router;
