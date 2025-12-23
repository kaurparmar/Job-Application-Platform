import { Application } from "../models/application.model.js";
import {Job} from "../models/job.model.js"
export const applyJob = async(req,res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res
            .status(400)
            .json({message: "Invalid job id", success:false})

        }
        // check if the user already has applied for this job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId

        });
        if(existingApplication){
            return res
            .status(400)
            .json({
                message: "You have already applied for this job",
                success:false
            })
        }
        //check if the job exists or not
        const job = await Job.findById(jobId);
        if(!job){
            return res
            .status(404)
            .json({message: "Job not found", success:false})
        }
        //create new application
        const newApplication = await Application({
            job: jobId,
            applicant: userId,
        });
        job.application.push(newApplication._id);
        await application.save();
        return res
        .status(201)
        .json({
            message: "Application submitted successfully",
            success:true,
            // data: application,
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Server error", success: false})
    }
};
export const getAppliedJobs = async(req,res)=>{
    try{
        const userId = req.id;
        const application = (await Application.find({applicant: userId})).sort({createdAt: -1})
        .populate({ path: "job", options: {sort: {createdAt: -1}},
        populate:{path: "company",
        options: {sort: {createdAt: -1}}},});
        if(!application){ 
            return res.status(404).json({message: "No applications found", success: false})
        }
        return res
        .status(200)
        .json({
            application,
            success:true,
            
        })

    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Server error", success: false})
    }
};
export const getApplicants = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: {sort: {createdAt: -1}},
            populate: {path: "applicant", options: {sort: {createdAt: -1}}},
        });
        if(!job){
            return res.status(404).json({message: "Job not found", success: false})
        }
        return res
        .status(200)
        .json({
            job,
            success:true,
        })

    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Server error", success: false})
    }
};
export const updateStatus = async(req,res)=>{
    try{
        const {status} = req.params;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({message: "Invalid Status", success: false})
        }
        const application = await Application.findById({_id:applicationId});
        if(!application){
            return res.status(404).json({message: "Application not found", success: false})
        }
        application.status = status.toLowerCase();
        await application.save();
       
        return res
        .status(200)
        .json({
            message: "Application status updated successfully",
            success:true,
            data: application,
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Server error", success: false})
    }       
};
