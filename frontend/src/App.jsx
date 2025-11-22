import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogLandingPage from "./pages/Blog/components/BlogLandingPage";
import BlogPostView from "./pages/Blog/components/BlogPostView";
import PostByTags from "./pages/Blog/components/PostByTags";
import SearchPosts from "./pages/Blog/components/SearchPosts";
import AdminLogin from "./pages/Admin/components/AdminLogin";
import PrivateRoutes from "./routes/PrivateRoutes";
import Dashboard from "./pages/Admin/components/Dashboard";
import BlogPost from "./pages/Admin/components/BlogPost";
import BlogPostEditor from "./pages/Admin/components/BlogPostEditor";
import Comments from "./pages/Admin/components/Comments";
import UserProvider from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<BlogLandingPage />} />
            <Route path="/:slug" element={<BlogPostView />} />
            <Route path="/tag/:tagName" element={<PostByTags />} />
            <Route path="/search" element={<SearchPosts />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoutes allowedRoutes={["admin"]} />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/posts" element={<BlogPost />} />
            <Route path="/admin/create" elements={<BlogPostEditor />} />
            <Route
              path="/admin/edit/:postSlug"
              element={<BlogPostEditor isEdit={true} />}
            />
            <Route path="/admin/comments" elements={<Comments />} />

            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
