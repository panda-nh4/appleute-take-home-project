import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getOrderDetails, getPastOrders, placeOrder } from "../controllers/orderController.js";

const router = express.Router();
router.post("/placeOrder",protectRoute,placeOrder)
router.get("/details",protectRoute,getOrderDetails)
router.get("/",protectRoute,getPastOrders)
export default router;
