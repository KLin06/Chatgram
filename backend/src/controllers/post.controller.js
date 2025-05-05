import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";

export const getMyPosts = async (req, res) => {
  const userId = req.user._id;

  try {
    const myPosts = await Post.find({ posterId: userId }).sort({ createdAt: -1 });

    return res.status(200).json({ myPosts });
  } catch (error) {
    console.log("Error in getMyPosts controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserPosts = async (req, res) => {
  const { userid: userId } = req.params;

  try {
    const posts = await Post.find({ posterId: userId }).sort({ createdAt: -1 });

    return res.status(200).json({ posts });
  } catch (error) {
    console.log("Error in getUserPosts controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFeed = async (req, res) => {
  const userId = req.user._id;

  try {
    const feed = await Post.find({posterId: {$ne:userId}}).sort({ createdAt: -1 });

    return res.status(200).json({feed});
  } catch (error) {
    console.log("Error in getFeed controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addPost = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const { posterId, caption } = req.body;

  try {
    const uploadResponse = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = uploadResponse.secure_url;

    fs.unlinkSync(req.file.path);

    const newPost = new Post({
      posterId,
      image: imageUrl,
      caption,
    });

    await newPost.save();
    res.status(200).json({ newPost });
  } catch (error) {
    console.log("Error in addPost controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCaption = async (req, res) => {
  const { postid: postId } = req.params;
  const { caption: newCaption } = req.body;

  try {
    await Post.findByIdAndUpdate(postId, { caption: newCaption }, { new: true });

    res.status(200).json({message: "Caption updated successfully"});
  } catch (error) {
    console.log("Error in updateCaption controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  const { postid: postId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.posterId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    await Post.deleteOne({ _id: postId });

    return res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    console.log("Error in deletePost controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
