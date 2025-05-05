import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useContactStore } from "./useContactStore";

export const usePostStore = create((set, get) => ({
  myPosts: [],
  feed: [],
  isPostsLoading: false,
  isFeedLoading: false,

  getMyPosts: async () => {
    set({ isPostsLoading: true });
    try {
      const res = await axiosInstance.get("/posts/myposts");

      set({ myPosts: res.data.myPosts });
    } catch (error) {
        console.log("Error getting posts", error)
    } finally {
      set({ isPostsLoading: false });
    }
  },

  getUserPosts: async (userId) => {
    set({ isPostsLoading: true });

    /*
    const { contacts } = useContactStore.getState();
    const contactIds = contacts.map((contact) => contact.user._id);

    if (!contactIds.includes(userId)) {
      return toast.error("User not in contacts");
    }
    */

    try {
        const res = await axiosInstance.get(`/posts/${userId}`);
        return res;
    } catch (error) {
        console.log("Error getting posts", error)
    } finally {
      set({ isPostsLoading: false });
    }
  },

  getFeed: async () => {
    set({ isFeedLoading: true });

    try {
        const res = await axiosInstance.get("/posts/feed");

        return res;
    } catch (error) {
    } finally {
      set({ isFeedLoading: false });
    }
  },

  addPost: async (formData) => {
    const { myPosts } = get();
    try {
      const res = await axiosInstance.post("/posts/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required
        },
      });

      set({ myPosts: [res.data.newPost, ...myPosts] });
      toast.success("Posted!");
    } catch (error) {
      throw error;
    }
  },

  updateCaption: async (postId, newCaption) => {
    const { myPosts = [] } = get();
    try {
      await axiosInstance.put(`/posts/updatecaption/${postId}`, { caption: newCaption });

      const updatedPosts = myPosts.map((post) => (post._id === postId ? { ...post, caption: newCaption } : post));

      set({ myPosts: updatedPosts });
      toast.success("Caption updated successfully")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deletePost: async (postId) => {
    const { myPosts } = get();
    try {
      await axiosInstance.delete(`/posts/deletepost/${postId}`);

      const updatedPosts = myPosts.filter((post) => post._id !== postId);

      if (updatedPosts.length === myPosts.length) {
        return toast.error("Post not found!");
      }

      set({ myPosts: updatedPosts });
      toast.success("Post deleted!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
