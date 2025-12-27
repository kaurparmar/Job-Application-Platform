import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  getApplicants,
  
} from "../controllers/job.controller.js";

const router = express.Router();

// static routes first
router.get("/jobs", authenticateToken, getAllJobs);
router.get("/admin/jobs", authenticateToken, getAdminJobs);
router.post("/post", authenticateToken, postJob);

// dynamic routes LAST
router.get("/:id/applicants", authenticateToken, getApplicants);
router.get("/:id", authenticateToken, getJobById);

export default router;
