import express from "express";
import { listAllProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", listAllProducts);

export default router;
