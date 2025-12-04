export const BASE_URL = import.meta.env.VITE_BASE_URL;


export const API_PATHS = {
    AUTH:{
        REGISTER: "/api/auth/register", //Signup
        LOGIN: "/api/auth/login", //Authentication user & return JWT token
        GET_PROFILE: "/api/auth/profile", //GET logged -in user details
    },

    IMAGE:{
        UPLOAD_IMAGE: "/api/auth/upload-image", //Upload profile picture
    },

    DASHBOARD: {
        GET_DASHBOARD_DATA: "/api/dashboard-summary", //Get DashBoard Data
    },

    AI: {
        GENERATE_BLOG_POST: "/api/ai/generate",
        GENERATE_BLOG_POST_IDEAS: "/api/ai/generate-ideas",
        GENERATE_COMMENT_REPLY: "/api/ai/generate-reply",
        GENERATE_POST_SUMMARY: "/api/ai/generate-summary",
    },

    POSTS:{
        CREATE: "/api/posts", //Create a new blog posts (Admin only)
        GET_ALL: "/api/posts", //Get all published blog posts
        GET_TRENDING:"/api/posts/trending",//Get trending blog posts
        GET_BY_SLUG: (slug) => `/api/posts/slug/${slug}`, //Get a single bloag post by slug
        UPDATE:(id) => `/api/posts/${id}`, //Update a blog post 
        DELETE:(id) => `/api/posts/${id}`, //Delete a blog post
        GET_BY_TAG:(tag) => `/api/posts/tag/${tag}`, //Get posts by a specific tag
        SEARCH:"/api/posts/search", //Search posts by title or content
        INCREMENT_VIEW: (id) => `/api/posts/${id}/view`, //Increment view count
        LIKE:(id)=> `/api/posts/${id}/like`, //Like a blog post 

    },
    COMMENTS: {
        ADD:(postId) => `/api/comments/${postId}`,
        GET_ALL:"/api/comments", //Get all comments
        GET_ALL_BY_POST:(postId) => `/api/comments/${postId}`,
        GET_BY_POST_ID: (postId) => `/api/comments/${postId}`,
        DELETE:(commentId) => `/api/comments/${commentId}`,
    },
}; 