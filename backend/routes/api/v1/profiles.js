const express = require("express");

const router = express.Router();
const profileApi = require("../../../controllers/api/v1/profile_apis");


//experience
router.post("/create-experience", profileApi.createExperience);
router.get("/get-all-experience/:applicantId",profileApi.getAllExperience);
router.delete("/delete-experience/:experienceId",profileApi.deleteExperience);
router.put("/modify-experience",profileApi.modifyExperience);


//education
router.post("/create-education", profileApi.createEducation);
router.get("/get-all-education/:applicantId",profileApi.getAllEducation);
router.delete("/delete-education/:educationId",profileApi.deleteEducation);
router.put("/modify-education",profileApi.modifyEducation);

//recommendation
router.get("/get-recommendation/:applicantId",profileApi.recommendCareer);

module.exports=router;