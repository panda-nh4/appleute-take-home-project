import express from "express";
import { addToCart, getCartItems } from "../controllers/cartController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/items",protectRoute, getCartItems);
router.post("/addToCart",protectRoute,addToCart)

export default router;
