import express from "express";
import { login, logout, signup, updateProfilePic, checkAuth , getUserById } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile-pic", protectRoute, updateProfilePic);

router.get("/check", protectRoute, checkAuth);
router.get("/getUser/:id", protectRoute, getUserById)

export default router;