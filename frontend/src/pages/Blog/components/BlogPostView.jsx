import React, { useEffect, useState, useContext } from "react";
import MarkdownContent from "../../Blog/components/MarkdownContent.jsx";
import axiosInstance from "../../../utils/axiosInstance";
import { sanitizeMarkdown } from "../../../utils/helper.js";
import SharePost from "./SharePost.jsx";
import { API_PATHS } from "../../../utils/apiPaths";
import moment from "moment";
import { LuLoaderCircle, LuDot, LuSparkles, LuCircleAlert } from "react-icons/lu";
import { UserContext } from "../../../context/userContext";
import CommentReplyInput from "../../../components/Inputs/CommentReplyInput";
import toast from "react-hot-toast";
import TrendingPostsSection from "../components/TrendingPostsSection";
import SkeletonLoader from "../../../components/Loader/SkeletonLoader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Drawer from "../../../components/Loader/Drawer.jsx";
import BlogLayout from "../../../components/layout/BlogLayout/BlogLayout";
import CommentInfoCard from "../../../components/Cards/CommentInfoCard";
import LikeCommentButton from "../../Blog/components/LikeCommentButton.jsx";

const BlogPostView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blogPostData, setBlogPostData] = useState(null);
  const [comments, setComments] = useState([]);

  const { user, setOpenAuthForm } = useContext(UserContext);

  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [openSummarizeDrawer, setOpenSummarizeDrawer] = useState(false);
  const [summaryContent, setSummaryContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Get Post Data
  const fetchPostDetailsBySlug = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_BY_SLUG(slug)
      );
      if (response.data) {
        const data = response.data;
        setBlogPostData(data);
        fetchCommentByPostId(data._id);
        incrementViews(data._id);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  // Get comments
  const fetchCommentByPostId = async (postId) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.COMMENTS.GET_BY_POST_ID(postId)
      );
      if (response.data) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const generateBlogPostSummary = async () => {
    try {
      setErrorMsg("");
      setSummaryContent(null);

      setIsLoading(true);
      setOpenSummarizeDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_POST_SUMMARY,
        {
          content: blogPostData.content || " ",

        }
      );
      if (response.data){
        setSummaryContent(response.data);
      }

    } catch (error) {
      setSummaryContent(null);
      setErrorMsg("Failed to generate summary, Try again." );
      console.error("Error",error);
    } finally{
      setIsLoading(false);
    }
  };

  const incrementViews = async (postId) => {
    if (!postId) return;
    try {
      await axiosInstance.post(API_PATHS.POSTS.INCREMENT_VIEW(postId));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async () => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.COMMENTS.ADD(blogPostData._id),
        {
          content:replyText,
          parentComment:"",
        }
      );
      toast.success("Reply added successfully!");

      setReplyText("");
      setShowReplyForm(false);
      fetchCommentByPostId(blogPostData._id);
    } catch (error) {
      console.error("Error adding reply:",error);
      
    }
  };

  useEffect(() => {
    fetchPostDetailsBySlug();
  }, [slug]);

  return (
    <BlogLayout>
      {blogPostData && (
        <>
          <title>{blogPostData.title}</title>
          <meta name="description" content={blogPostData.title} />
          <meta name="og:title" content={blogPostData.title} />
          <meta name="og:image" content={blogPostData.coverImageUrl} />
          <meta name="og:type" content="article" />

          <div className="grid grid-cols-12 gap-8 relative">
            {/* LEFT COLUMN */}
            <div className="col-span-12 md:col-span-8 relative">
              <h1 className="text-lg md:text-2xl font-bold mb-2 line-clamp-3">
                {blogPostData.title}
              </h1>

              {/* Tags + Summary Button */}
              <div className="flex items-center gap-1 flex-wrap mt-3 mb-5">
                <span className="text-[13px] text-gray-500 font-medium">
                  {moment(blogPostData.updatedAt).format("Do MMM YYYY")}
                </span>

                <LuDot className="text-xl text-gray-400" />

                <div className="flex items-center flex-wrap gap-2">
                  {(blogPostData.tag || []).slice(0, 3).map((tag, index) => (
                    <button
                      key={index}
                      className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tag/${tag}`);
                      }}
                    >
                      # {tag}
                    </button>
                  ))}
                </div>

                <button
                  className="flex items-center gap-2 bg-linear-to-r from-sky-500 to-cyan-400 text-white font-medium px-3 py-0.5 rounded-full"
                  onClick={generateBlogPostSummary}
                >
                  <LuSparkles />
                </button>
              </div>

              {/* Feature image */}
              <img
                src={blogPostData.coverImageUrl}
                alt={blogPostData.title}
                className="w-full h-96 object-cover mb-6 rounded-lg"
              />

              {/* MARKDOWN + SHARE */}
              <MarkdownContent
                content={sanitizeMarkdown(blogPostData.content || "")}
              />

              <SharePost title={blogPostData.title} />

              {/* COMMENTS */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Comments</h4>

                  <button
                    className="flex items-center justify-center gap-3 bg-linear-to-r from-sky-500 to-cyan-400 text-xs font-semibold text-white px-5 py-2 rounded-full"
                    onClick={() => {
                      if (!user) {
                        setOpenAuthForm(true);
                        return;
                      }
                      setShowReplyForm(true);
                    }}
                  >
                    Add Comment
                  </button>
                </div>

                {/* COMMENT INPUT */}
                {showReplyForm && (
                  <div className="bg-white pt-1 pb-5 pr-8 rounded-lg mb-8">
                    <CommentReplyInput
                      user={user}
                      authorName={user?.name}
                      content={""}
                      replyText={replyText}
                      setReplyText={setReplyText}
                      handleAddReply={handleAddReply}
                      disableAutoGen
                      type="new"
                    />
                  </div>
                )}

                {/* COMMENT LIST */}
                {comments?.length > 0 &&
                  comments.map((comment) => (
                    <CommentInfoCard
                      key={comment._id}
                      commentId={comment._id}
                      authorName={comment.author?.name}
                      authorPhoto={comment.author?.profileImageUrl}
                      content={comment.content}
                      updatedOn={
                        comment.updatedAt
                          ? moment(comment.updatedAt).format("Do MMM YYYY")
                          : "-"
                      }
                      post={comment.post}
                      replies={comment.replies || []}
                      getAllComments={() =>
                        fetchCommentByPostId(blogPostData._id)
                      }
                      onDelete={(commentId) => {
                        // You must define setOpenDeleteAlert above if using this
                        console.log("Delete:", commentId);
                      }}
                    />
                  ))}
              </div>
            </div>


            <LikeCommentButton
              postId={blogPostData._id || ""}
              likes={blogPostData.likes || 0}
              comments={comments?.length || 0}
              />

              {/* RIGHT SIDEBAR */}
            <div className="col-span-12 md:col-span-4">
              <TrendingPostsSection />
            </div>
          </div>

          
          

          <Drawer
            isOpen={openSummarizeDrawer}
            onClose={() => setOpenSummarizeDrawer(false)}
            title={!isLoading && summaryContent?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium" >
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader/>}
            {!isLoading && summaryContent && (
              <MarkdownContent content={summaryContent?.summary || ""}/>
            )}
            </Drawer>


        </>
      )}
    </BlogLayout>
  );
};

export default BlogPostView;
