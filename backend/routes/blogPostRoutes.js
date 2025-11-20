import express from "express";
const router = express.Router();

import {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostBySlug,
    getPostsByTag,
    searchPosts,
    likePost,
    getTopPosts,
    incrementView,
} from "../controllers/blogPostController.js";

import protect from "../middlewares/authMiddleware.js";

// Admin-only middleware
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access only" });
    }
};

// Routes
router.post("/", protect, adminOnly, createPost); // CREATE POST (Admin only)
router.get("/", getAllPosts); // GET ALL POSTS
router.get("/slug/:slug", getPostBySlug); // GET BY SLUG
router.put("/:id", protect, adminOnly, updatePost); // UPDATE POST (Admin only)
router.delete("/:id", protect, adminOnly, deletePost); // DELETE POST (Admin only)
router.get("/tag/:tag", getPostsByTag); // FILTER BY TAG
router.get("/search", searchPosts); // SEARCH POSTS
router.post("/:id/view", incrementView); // INCREMENT VIEW
router.post("/:id/like", protect, likePost); // LIKE POST (logged in users only)
router.get("/trending", getTopPosts); // TOP POSTS

export default router;
