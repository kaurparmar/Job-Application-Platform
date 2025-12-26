import express from 'express'
import authenticateToken from "../middleware/isAuthenticated.js";
import {
    getAdminJobs,
    getAllJobs,
    getJobById,
    postJob,
} from "../controllers/job.controller.js"
const router = express.Router();

// 1. Static routes first
router.get("/jobs", authenticateToken, getAllJobs);


router.get("/admin/jobs", authenticateToken, getAdminJobs);


router.post("/post", authenticateToken, postJob);


router.get("/:id", authenticateToken, getJobById);


export default router;
