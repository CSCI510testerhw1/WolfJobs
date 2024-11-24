const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const email = require("../../../models/email");
const Experience=require("../../../models/experience");
const { application } = require("express");

require("dotenv").config();

module.exports.createExperience=async function(req,res){
    try{


        res.set("Access-Control-Allow-Origin", "*"); 
        const experience=await Experience.create(req.body);

        return res.status(200).json({
            message: "Experience Created Successfuly",
            data: {
              'experience':experience._id,
              'user':experience.applicantId
            },
            success: true,
          });
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"+err,
          });
    }
};

module.exports.getAllExperience=async function(req,res){
    try{


        res.set("Access-Control-Allow-Origin", "*"); 
        const result=await Experience.find({applicantId:req.params.applicantId}).sort({fromDate:-1});

        return res.status(200).json({
            message: "Experience retrieved Successfuly",
            data: {
              'experience':result,
            },
            success: true,
          });
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"+err,
          });
    }
};

module.exports.deleteExperience=async function(req,res){
    try{


        res.set("Access-Control-Allow-Origin", "*"); 
        const deletedExperience=await Experience.findByIdAndDelete(req.params.experienceId);
    

        return res.status(200).json({
            message: "Experience deleted Successfuly",
            data: {
              'experience':deletedExperience,
            },
            success: true,
          });
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"+err,
          });
    }
};


module.exports.modifyExperience=async function(req,res){
    try{


        res.set("Access-Control-Allow-Origin", "*"); 
        console.log(req.body);
        const updatedExperience=await Experience.findByIdAndUpdate(req.body._id,req.body,{new:true});
        
        return res.status(200).json({
            message: "Experience modified Successfuly",
            data: {
              'experience':updatedExperience,
            },
            success: true,
          });
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"+err,
          });
    }
};


