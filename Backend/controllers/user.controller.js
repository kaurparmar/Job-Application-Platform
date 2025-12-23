
import  {User}  from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cloudinary from "../utils/cloud.js";
import getDataUri from "../utils/datauri.js"



export const register = async (req, res) => {
    try {
        // support both JSON and multipart/form-data (multer puts fields on req.body)
        let { fullname, email, phoneNumber, phone, password, role} = req.body || {};
        const phoneVal = phoneNumber || phone;
        let profilePhoto = req.file
        // normalize role to lowercase
        role = typeof role === 'string' ? role.toLowerCase() : role;

        // log payload to help debugging
        console.log('Register payload:', { fullname, email, phoneVal, role, profilePhoto });

        const missing = [];
        if (!fullname) missing.push('fullname');
        if (!email) missing.push('email');
        if (!phoneVal) missing.push('phone/phoneNumber');
        if (!password) missing.push('password');
        if (!role) missing.push('role');
        if (missing.length) {
            return res.status(400).json({
                message: `Missing required fields: ${missing.join(', ')}`,
                success: false,
                missing,
            });
        }

        // const file=req.file;
        // const fileUri=getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        // Validate allowed roles explicitly
        const allowedRoles = ['applicant', 'recruiter'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message: `Invalid role. Allowed values: ${allowedRoles.join(', ')}`,
                success: false,
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'Email already exists',
                success: false,
            });
        }
        let cloudResponse=null
    console.log(profilePhoto)
    if (profilePhoto) {
      const fileUri = getDataUri(profilePhoto);
      console.log(fileUri)
       cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      
    }

    // const fileUri = getDataUri(file);
    // cont cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // convert password to hash
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            email,
            phoneNumber: phoneVal,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: cloudResponse? cloudResponse.secure_url : "",
                
            }
        });

        // If a profile photo was uploaded, record its original name in profile.profilePhoto
        // if (req.file) {
        //     newUser.profile = newUser.profile || {};
        //     newUser.profile.profilePhoto = req.file.originalname || '';
        // }
        

        // if (req.file) {
        //     let file=req.file
        //     newUser.profile = newUser.profile || {};
        //     const fileUri = getDataUri(file);
        //     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        //     newUser.profile.profilePhoto = cloudResponse.secure_url; // store URL
        //     newUser.profile.profilePhotoOriginalName = file.originalname; // optional: store original name
        // }

        try {
            console.log("FINAL PROFILE DATA:", newUser.profile);
            await newUser.save();
        } catch (saveErr) {
            console.error('Error saving user:', saveErr);
            if (saveErr.name === 'ValidationError') {
                const messages = Object.values(saveErr.errors).map(e => e.message);
                return res.status(400).json({ message: messages.join('; '), success: false, errors: saveErr.errors });
            }
            if (saveErr.code === 11000) {
                return res.status(409).json({ message: 'Duplicate key error', success: false, keyValue: saveErr.keyValue });
            }
            throw saveErr;
        }

        return res.status(201).json({
            message: `Account created successfully ${fullname}`,
            success: true,
        });
    } catch (error) {
        console.error('register error:', error);
        res.status(500).json({
            message: 'Server Error',
            success: false,
            error: error.message,
        });
    }
};
export const login = async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
             return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        //check role correctly or not
        if(user.role !== role){
             return res.status(403).json({
                message: "You don't have the necessary role to access this resource",
                success: false,
            });
        }
        //generate token
        const tokenData={
            userId: user._id,
        };
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET, {expiresIn: "1d"});
        user={
            _id:user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            token,
            success: true,
            profile: user.profile,
        }
        return res.status(200).cookie('token',token,{maxAge:24*60*60*1000, httpOnly: true,
            sameSite: "Strict",
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server Error registering user",
            success: false,
        })
    }
};
export const logout = (req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0})
        .json({
            message: "Logout Successfully",
            success: true,
        })
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        // 1. Get user ID and find user
        const userId = req.id; 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // 2. Handle File Upload ONLY if file exists
        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
            
            // Update resume fields if a new file was provided
            user.profile.resume = cloudinaryResponse.secure_url;
            user.profile.resumeOriginalname = file.originalname;
        }

        // 3. Update other basic fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // 4. Ensure profile object exists and update sub-fields
        user.profile = user.profile || {};
        if (bio !== undefined) user.profile.bio = bio;

        if (skills) {
            user.profile.skills = Array.isArray(skills)
                ? skills
                : skills.split(",").map(s => s.trim()).filter(Boolean);
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });
    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        return res.status(500).json({
            message: "Server Error updating profile",
            success: false,
            error: error.message,
        });
    }
};
