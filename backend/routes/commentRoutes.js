import express from "express";
const router = express.Router();

import {
    addComment,
    getCommentsByPost,
    deleteComment,
    getAllComments,
} from"../controllers/commentController.js";
import protect from "../middlewares/authMiddleware.js";

router.post("/:postId",protect,addComment);
router.get("/:postId",getCommentsByPost);
router.get("/",getAllComments);
router.delete("/:commentId",protect,deleteComment);


export default router;