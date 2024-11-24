const { createExperience } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const { getAllExperience } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const { deleteExperience } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const { modifyExperience } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const Education = require("../models/education");
const Experience = require("../models/experience");
require("dotenv").config();
jest.mock("../models/education");
jest.mock("../models/experience");

describe("createExperience", () => {
    let req, res;

    var start = new Date("2022-03-25");
    var end = new Date("2024-03-25");

    beforeEach(() => {
        req = {
          body: {
            applicantId: "applicantId123",
            organization: "Google",
            role: "Software Dev",
            description: "I created Google Docs.",
            fromDate: start,
            toDate: end,
          },
        };
    
        res = {
          set: jest.fn().mockReturnThis(),
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      });

      it("create an experience", async () => {
        //Experience.findOne.mockResolvedValueOnce(true); // Mocking existing application
    
        await createExperience(req, res);
    
        expect(res.set).toHaveBeenCalledWith("Access-Control-Allow-Origin", "*");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: "Experience Created Successfuly",
          success: true,
        });
      });
});