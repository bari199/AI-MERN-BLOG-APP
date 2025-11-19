import BlogPost from "../models/BlogPost.js";
import mongoose from "mongoose";

//@desc Create a new blog post 
//@route POST /api/post
//@access Private (Admin only)
const createPost = async(req,res) => {
    try {
        
    } catch (error) {
        res
        .status(500)
        .json({message:"Failed to create post",error:error.message});
    }
};

//@desc     Update an existing blog post
//@route    PUT /api/posts/:id
//@accsess  Private (Author or Admin)
const updatePost = async(req,res) =>{

};

// @desc       Delete a Blog post
// @route      Delete /api/posts/:id
// @access     Private (Author or Admin)

const deletePost = async (req, res) => {

};

// @desc   Get blog posts by status (all, published, or draft) and include counts
// @route  GET /api/posts?status=published|draft|all&page=1
// @access Public

const getAllPosts = async(req,res) => {


};

// @desc    Get a single blog post by slug
// @route   GET /api/posts/:slug
// @access  Public 

const getPostBySlung =async (req,res) => {


};

// @desc    Get post by tag 
// @route   GET /api/posts/tag/:tag
// @access Public

const getPostsByTag = async(req,res) => {

}

// @desc    Search posts by title or content
// @route   GET /api/posts/search?q=keyword
// @access  Public

const searchPosts = async(req,res) => {

};

// @desc    Increment post view count
// @route   PUT /api/posts/:id/view
// @access  Public

const incrementView = async (req,res) => {

};


