import express from "express";
import {
  login,
  logOut,
  signUp,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logOut);
router.post("/signUp", signUp);
router.get("/profile",protectRoute, getProfile);
router.put("/update",protectRoute, updateProfile);
export default router;
