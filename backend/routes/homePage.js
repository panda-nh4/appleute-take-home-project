import express from "express";
import { featured, featuredProducts, topCategories } from "../controllers/homeController.js";

const router = express.Router();
router.get("/featured",featured)
router.get("/topCategories",topCategories)
router.get("/featuredProducts",featuredProducts)

export default router