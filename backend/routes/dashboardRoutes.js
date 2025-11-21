import express from "express";
const router = express.Router();

import protect from "../middlewares/authMiddleware.js";
import {getDashboardSummary} from "../controllers/dashboardController.js";

// Admin-only middleware 

const adminOnly = (req,res,next) => {
    if(req.user && req.user.role == 'admin'){
        next();
    } else {
        res.status(403).json({message:"Admin access only"});
    }
};

router.get("/",protect,adminOnly,getDashboardSummary);

export default router;

