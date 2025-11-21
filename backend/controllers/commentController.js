import Comment from "../models/Comment.js";
import BlogPost from "../models/BlogPost.js";

// @desc    Add a comment to a blog post
// @route   POST /api/comments/:postId
// @access  Private
const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;

    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user._id, 
      content,
      parentComment: parentComment || null,
    });

    await comment.populate("author", "name profileImageUrl");

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
        .populate("author","name profileImageUrl")
        .populate("post", "title coverImageUrl")
        .sort({createdAt: 1 })

    const commentMap = {};
    comments.forEach(comment => {
        comment = comment.toObject();
        comment.replies = [];
        commentMap[comment._id] = comment;

    });

    //Nest replies under their parentComment
    const nestedComments = [];
    comments.forEach(comment =>{
        if(comment.parentComment){
            const parent = commentMap[comment.parentComment];
            if(parent){
                parent.replies.push(commentMap[comment._id]);
            }

        }else{
            nestedComments.push(commentMap[comment._id]);
        }
    });

    res.json(nestedComments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all comments",
      error: error.message,
    });
  }
};

// @desc    Get all comments for a blog post
// @route   GET /api/comments/:postId
// @access  Public
const getCommentsByPost = async (req, res) => {
  try {
    const {postId} = req.params;

    const comments = await Comment.find({post : postId})
      .populate("author","name profileImageUrl")
      .populate("post","title coverImageUrl")
      .sort({ createdAt: 1 })
    // Create a map for commentId -> COMMENTS object
    const commentMap = {};
    comments.forEach(comment => {
      comment = comment.toObject(); // Convert from Mongoose Document to plane object
      comment.replies = []
      commentMap[comment._id] = comment;
    });


    //Nest replies under their parentComment 
    const nestedComments = [];
    comments.forEach(comment => {
      if(comment.parentComment){
        const parent = commentMap[comment.parentComment];
        if(parent){
          parent.replies.push(commentMap[comment._id]);
        }
      }else{
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.json(nestedComments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
};

// @desc    Delete a comment and its replies
// @route   DELETE /api/comments/:commentId
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const {commentId} = req.params;

    const comment = await Comment.findById(commentId);
    if(!comment){
      return res.status(404).json({message:"Comment not found"});
    }

    //Delete the comment 
    await Comment.deleteOne({_id:commentId});

    // Delete all replies to this comment (one level of nesting)
    await Comment.deleteMany({parentComment:commentId});

    res.json({message:"Comment amd any replies deleted successfully "});

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete comment",
      error: error.message,
    });
  }
};

export {
  addComment,
  getCommentsByPost,
  deleteComment,
  getAllComments,
};
