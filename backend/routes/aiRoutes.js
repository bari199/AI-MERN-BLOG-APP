import express from "express";
const router = express.Router();
import protect from "../middlewares/authMiddleware.js";
import {generateBlogPost, generateBlogPostIdeas, generateCommentReply, generatePostSummary} from "../controllers/aiController.js"


router.post("/generate", protect, generateBlogPost);
router.post("/generate-ideas",protect,generateBlogPostIdeas);
router.post("/generate-reply",protect,generateCommentReply);
router.post("/generate-summary",generatePostSummary);

export default router ;

