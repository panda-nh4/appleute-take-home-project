import express from "express";
import { addToCart, getCartItems, getValue, removeFromCart } from "../controllers/cartController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/items",protectRoute, getCartItems);
router.post("/addToCart",protectRoute,addToCart)
router.post("/removeFromCart",protectRoute,removeFromCart)
router.get("/value",protectRoute,getValue)

export default router;
