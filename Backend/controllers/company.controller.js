import {Company} from "../models/company.model.js"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloud.js"
export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const company = await Company.create({
      name,
      description: description || "Not provided",
      website: website || "Not provided",
      location,
      employees: [req.id],
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.error("Register company error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllCompanies = async(req,res)=>{
   console.log("🔥 GET /company/get HIT");
    try{
        
        const companies = await Company.find({employees:req.id})
        console.log(companies)
        if(!companies){
            return res.status(404).json({message: "No companies found"});
        }
        return res.status(200).json({
            companies,
            success: true
        })
    }
    catch(error){
        console.error(error);
    }
}

// get company by id
export const getCompanyById = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({message: "Company not found"});
        }
        return res.status(200).json({company,success:true});

    }
    catch(error){
        console.error(error);
    }
}

//update company details
export const updateCompany = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.website) updateData.website = req.body.website;
    if (req.body.location) updateData.location = req.body.location;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content
      );
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });

  } catch (error) {
    console.error("Update company error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating company",
    });
  }
};
export const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }); // example
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
