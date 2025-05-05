import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addPost, updateCaption, deletePost, getUserPosts, getFeed, getMyPosts } from "../controllers/post.controller.js";
import upload from "../lib/multer.js"

const router = express.Router();

router.get("/myposts", protectRoute, getMyPosts);
router.get("/feed", protectRoute, getFeed);
router.get("/:userid", protectRoute, getUserPosts);
router.post("/post", protectRoute,  upload.single("image"), addPost);
router.put("/updatecaption/:postid", protectRoute,  upload.single("image"), updateCaption);
router.delete("/deletepost/:postid", protectRoute, deletePost);

export default router;