import express from 'express'
import upload from "../middleware/upload.js"
import {register} from "../controllers/user.controller.js"
import authenticateToken from "../middleware/isAuthenticated.js"
import {login,logout} from "../controllers/user.controller.js"
import { updateProfile } from '../controllers/user.controller.js'
const router=express.Router();
// register may send multipart/form-data (profile photo), so use multer to parse it
router.route("/register").post(upload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(authenticateToken, upload, updateProfile);

export default router;