import express from "express";
const router = express.Router();
import {protect} from "../middlewares/authMiddleware.js";
import {generatedBlogPost, generatedBlogPostIdeas, generateCommentReply, generatePostSummary} from "../controllers/aiController.js"


router.post("/generate", protect, generatedBlogPost);
router.post("/generate-ideas",protect,generatedBlogPostIdeas);
router.post("/generate-reply",protect,generateCommentReply);
router.post("/generate-summary",generatePostSummary);

export default router ;

