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
router.route("/get").get(authenticateToken, getAllJobs);
router.route("/post").post(authenticateToken, postJob);
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);

// 2. Dynamic routes (with :id) LAST
router.route("/get/:id").get(authenticateToken, getJobById);

export default router;
