import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,

        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['applicant','recruiter'],
        default:'applicant',
        required:true,
    },
    profile:{
            bio:{
            type:String
            },
            skills:[{
                type:String,
                },
            ],
        
            resume:{
                type:String, //URL to resume file
            },
            resumeOriginalname:{
                type:String,
            },
            company:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Company',
            },
            profilePhoto:{
                type:String, //URL to profile photo file
                default:"",
            
        },
    }
},{timestamps:true});
export const User = mongoose.model("User",userSchema)