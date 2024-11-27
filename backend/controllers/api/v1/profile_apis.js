const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const email = require("../../../models/email");
const Experience=require("../../../models/experience");
const Education=require("../../../models/education");
const { application } = require("express");

require("dotenv").config();

const openai_key=process.env.openai_key;
const OpenAI=require("openai");
const openai=new OpenAI({apiKey:openai_key});
const { GoogleGenerativeAI } = require("@google/generative-ai");

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
        const result=await Experience.find({applicantId:req.params.applicantId});

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


module.exports.createEducation=async function(req,res){
  try{


      res.set("Access-Control-Allow-Origin", "*"); 
      const education=await Education.create(req.body);

      return res.status(200).json({
          message: "Education Created Successfuly",
          data: {
            'education':education._id,
            'user':education.applicantId
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

module.exports.getAllEducation=async function(req,res){
  try{


      res.set("Access-Control-Allow-Origin", "*"); 
      const result=await Education.find({applicantId:req.params.applicantId});

      return res.status(200).json({
          message: "Education retrieved Successfuly",
          data: {
            'education':result,
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

module.exports.deleteEducation=async function(req,res){
  try{


      res.set("Access-Control-Allow-Origin", "*"); 
      const deletedEducation=await Education.findByIdAndDelete(req.params.educationId);
  

      return res.status(200).json({
          message: "Education deleted Successfuly",
          data: {
            'education':deletedEducation,
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


module.exports.modifyEducation=async function(req,res){
  try{


      res.set("Access-Control-Allow-Origin", "*"); 
      console.log(req.body);
      const updatedEducation=await Education.findByIdAndUpdate(req.body._id,req.body,{new:true});
      
      return res.status(200).json({
          message: "Education modified Successfuly",
          data: {
            'education':updatedEducation,
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

module.exports.recommendCareer=async function(req,res){
  try{


      res.set("Access-Control-Allow-Origin", "*"); 
      const openai_key=process.env.openai_key;
      const allExperience=await Experience.find({applicantId:req.params.applicantId});
      const allEducation=await Education.find({applicantId:req.params.applicantId});
      if(allExperience.length==0 && allEducation.length==0){
          return res.status(200).json({
              message: "No experience or education records found to make a recommendation. Provide a detailed education and experience record for the best experience.",
              error: 'Create experience and education history ',
              success: false,
            });
      }
      // console.log('Experience\n',allExperience);
      // console.log('Education\n',allEducation);
      // console.log(typeof(allExperience));
      history="";
      if(allExperience.length!=0){
        for(i=0;i<allExperience.length;i++){
          experience="Work Experience "+ (i+1).toString()+":\n"+ " Organization:"+allExperience[i].organization+"\n"+" Role:"+allExperience[i].role+"\n"+
                      "Description:"+(allExperience[i].description ? allExperience[i].description.toString() : 'None')+"\n"+" From Date:"+ allExperience[i].fromDate.toString()+"\n"
                      +" To Date:"+(allExperience[i].toDate? allExperience[i].toDate.toString() : 'Present');
          history=history+experience+"\n";
        }
      }
      if(allEducation.length!=0){
        for(i=0;i<allEducation.length;i++){
          education="Education "+ (i+1).toString()+"\n"+" From Date:"+ allEducation[i].fromDate.toString()+"\n"+" To Date:"+(allEducation[i].toDate? allEducation[i].toDate.toString() : 'Present');
          history=history+education+"\n";
        } 
      }
    
      console.log("THE HISTORY IS:\n",history);
    //   const completion = await openai.chat.completions.create({
    //     model: "gpt-4o-mini",
    //     messages: [
    //         {
    //             role: "user",
    //             content: "This is a profile of a user. Give them a career recommendation in less than 150 words. Start directly with recommendation. Your answer should only have recommendation.:\n"+history,
    //         },
    //     ],
    // });
    // console.log("COMPLETION\n",completion);
    // completion.choices[0].message,
    
    // console.log(completion.choices[0].message);
    const genAI = new GoogleGenerativeAI(process.env.gemini_api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "This is a profile of a user. Give them a career recommendation in less than 150 words. Start directly with recommendation."+
    "Tell what that person can do in life. Give them some suggestions about their career. Your answer should only have recommendation. Do not end in next line characters:\n. "+history;
 
    const result = await model.generateContent(prompt);
    console.log(result.response.text());


      return res.status(200).json({
          message: "Success",
          recommendation: result.response.text(),
          success: true,
        });
 
  }
  catch(err){
      return res.status(500).json({
          message: "Internal Server Error"+err,
        });
  }
};




// # curl \
// #   -H "Content-Type: application/json" \
// #   -d "{\"contents\":[{\"parts\":[{\"text\":\"Explain how AI works\"}]}]}" \
// #   -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAwV17PrFPvlt8m8EyAVXAa7nDrip-e4UA"