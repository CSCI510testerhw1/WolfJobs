const express = require("express");

const router = express.Router();
const profilesApi = require("../../../controllers/api/v1/profiles_api");

router.post("/create-experience", profilesApi.createExperience);
router.get("/get-all-experience/:applicantId",profilesApi.getAllExperience);
router.delete("/delete-experience/:experienceId",profilesApi.deleteExperience);
router.put("/modify-experience",profilesApi.modifyExperience);


module.exports=router;