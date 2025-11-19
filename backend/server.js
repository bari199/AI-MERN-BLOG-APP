import 'dotenv/config'; // ES Module way to load .env file
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Used for __dirname replacement

import connectDB from './config/db.js'; // Note the .js extension

// Import Routes (Uncomment as needed)
import authRoutes from './routes/authRoutes.js';
import blogPostRoutes from './routes/blogPostRoutes.js';
// import commentRoutes from './routes/commentRoutes.js';
// import dashboardRoutes from './routes/dashboardRoutes.js';

// --- ES Module equivalent of __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// -----------------------------------------

const app = express();

// Connect Data Base
connectDB();

// Middleware to handle CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Middleware 
app.use(express.json());

// Routes (Uncomment as needed)
 app.use("/api/auth", authRoutes);
 app.use("/api/posts", blogPostRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/dashboard-summary", dashboardRoutes);
// app.use("/api/ai", aiRoutes);

// Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));