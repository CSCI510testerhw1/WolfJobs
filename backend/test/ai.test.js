const User = require("../models/user");
const jwt = require("jsonwebtoken");
const email = require("../models/email");
const Experience=require("../models/experience");
const Education=require("../models/education");
const { application } = require("express");
const { recommendCareer } = require("../controllers/api/v1/profile_apis"); // Update with your actual path

require("dotenv").config();

const openai_key=process.env.openai_key;
const OpenAI=require("openai");
const openai=new OpenAI({apiKey:openai_key});
const { GoogleGenerativeAI } = require("@google/generative-ai");

jest.mock("../models/education");
jest.mock("../models/experience");

describe('POST /recommendCareer', () => {

    beforeEach(() => {
        res = {
          set: jest.fn().mockReturnThis(),
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      });

    it('should return a message when no experience or education records are found', async () => {
        const req = {
            params: { applicantId: '12345' }
        };
    
        // Mock the database call to return empty arrays
        Experience.find = jest.fn().mockResolvedValue([]);
        Education.find = jest.fn().mockResolvedValue([]);

        // Mocking the `sort` method to return the sorted data
        // In this case, we're assuming that we sort by `fromDate` in descending order
        Experience.find.mockReturnValue({
            sort: jest.fn().mockReturnValue([].sort((a, b) => b.fromDate - a.fromDate))
        });
        
        Education.find.mockReturnValue({
            sort: jest.fn().mockReturnValue([].sort((a, b) => b.fromDate - a.fromDate))
        });
        
        await recommendCareer(req, res);
    
        //expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "No experience or education records found to make a recommendation. Provide a detailed education and experience record for the best experience.",
            error: 'Create experience and education history ',
            success: false,
        });
    });

    it('should return a career recommendation when only experience records are available', async () => {
        const req = { params: { applicantId: '12345' } };
    
        // Mock experience data
        Experience.find = jest.fn().mockResolvedValue([
            { organization: 'Company A', role: 'Developer', description: 'Developed apps', fromDate: '2020-01-01', toDate: '2023-01-01' }
        ]);
        Education.find = jest.fn().mockResolvedValue([]);

        Experience.find.mockReturnValue({
            sort: jest.fn().mockReturnValue([].sort((a, b) => b.fromDate - a.fromDate))
        });
        
        Education.find.mockReturnValue({
            sort: jest.fn().mockReturnValue([].sort((a, b) => b.fromDate - a.fromDate))
        });
    
        // Mock external API response for career recommendation
        const mockModel = { generateContent: jest.fn().mockResolvedValue({ response: { text: jest.fn().mockReturnValue('You should continue working in tech and explore full-stack development.') } }) };
        GoogleGenerativeAI.mockImplementation(() => ({ getGenerativeModel: jest.fn().mockReturnValue(mockModel) }));
    
        await recommendCareer(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Success",
            recommendation: 'You should continue working in tech and explore full-stack development.',
            success: true,
        });
    });

});

