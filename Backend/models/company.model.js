import mongoose from "mongoose"
const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:"true"
    },
    description:{
        type:String,
        default:"NA"
    },
    website:{
        type:String,
        default:"NA"
    },
     location:{
        type:String,
        
    },
     logo:{
        type:String, //url for logo
        default:""
    },
    
    employees:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
    ],
},{
timestamps:true,})
export const Company = mongoose.model("Company",companySchema);