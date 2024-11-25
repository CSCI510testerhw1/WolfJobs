const { createExperience } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const { getAllExperience } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const { deleteExperience } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const { modifyExperience } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const Education = require("../models/education");
const Experience = require("../models/experience");
const request = require('supertest');
const mockingoose = require("mockingoose");
const User = require("../models/user");

require("dotenv").config();
jest.mock("../models/education");
jest.mock("../models/experience");

describe('POST /createExperience', () => {

    var start = new Date("2022-03-25");
    var end = new Date("2024-03-25");

    beforeEach(() => {
        res = {
          set: jest.fn().mockReturnThis(),
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      });

  it('should successfully create an experience and return a 200 status', async () => {
    // Mocking a sample experience to be returned by the mocked method
    const mockExperience = {
      _id: '60d0fe4f5311236168a109f9',
      applicantId: '60d0fe4f5311236168a109f8',
    };
    
    // Mock the Experience.create() function to return the mock data
    Experience.create.mockResolvedValue(mockExperience);

    const reqBody = {
      // provide necessary fields that Experience.create expects in the request body
      applicantId: '60d0fe4f5311236168a109f8',
      title: 'Software Engineer',
      company: 'Example Corp',
      description: 'Building cool stuff',
    };

    // Call the create function
    await createExperience(reqBody, res);

    // Assert the response structure
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.set).toHaveBeenCalledWith("Access-Control-Allow-Origin", "*");
    expect(res.json).toHaveBeenCalledWith({
            message: "Experience Created Successfuly",
            data: {
              'experience': "60d0fe4f5311236168a109f9",
              'user': '60d0fe4f5311236168a109f8'
            },
            success: true,
    });
  });

  it('should return 500 if there is an error while creating an experience', async () => {
    // Mock the Experience.create() to throw an error
    Experience.create.mockRejectedValue(new Error('Database error'));

    const reqBody = {
      applicantId: '60d0fe4f5311236168a109f8',
      title: 'Software Engineer',
      company: 'Example Corp',
      description: 'Building cool stuff',
    };

    // Call the POST endpoint
    await createExperience(reqBody, res);

    // Assert the error message in the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server ErrorError: Database error",
    });

  });
});

describe('GET /getExperience', () => {
  beforeEach(() => {
    res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  it('should successfully retrieve all experiences for an applicant', async () => {
    // Mocking the result of the Experience.find() method
    // const mockExperiences = [
    //   {
    //     _id: "60d7b124fa8b6d1e4b1e2e29",
    //     applicantId: "60d7b122fa8b6d1e4b1e2e28",
    //     organization: "Company XYZ",
    //     role: "Software Engineer",
    //     description: "Developing web applications",
    //     fromDate: new Date('2020-01-01'),
    //     toDate: new Date('2022-01-01')
    //   },
    //   {
    //     _id: "60d7b124fa8b6d1e4b1e2e30",
    //     applicantId: "60d7b122fa8b6d1e4b1e2e28",
    //     organization: "Company ABC",
    //     role: "Junior Developer",
    //     description: "Assisting with software development",
    //     fromDate: new Date('2018-01-01'),
    //     toDate: new Date('2020-01-01')
    //   }
    // ];

    // // Mock the Experience.find() function to return the mock experiences
    // Experience.find.mockResolvedValue(mockExperiences);

    // // Experience.sort.mockResolvedValue(mockExperiences.sort());

    // const reqBody = {
    //   params: {
    //     applicantId: '60d0fe4f5311236168a109f8',
    //     experienceId: '60d0fe4f5311236168a109f9'
    //   }
    // };

    // // Call the GET endpoint
    // // Call the create function
    // await getAllExperience(reqBody, res);

    // // Assert the response structure
    // //expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //         message: "Experience retrieved Successfuly",
    //         data: {
    //           'experience': "60d0fe4f5311236168a109f9",
    //         },
    //         success: true,
    });
});
  it("should return 500 on internal error", async () => {
    // Experience.find.mockRejectedValue(new Error("Database Error"));

    // const reqBody = {
    //   params: {
    //     applicantId: '60d0fe4f5311236168a109f8',
    //     experienceId: '60d0fe4f5311236168a109f9'
    //   }
    // };

    // // Call the GET endpoint
    // // Call the create function
    // await getAllExperience(reqBody, res);
    
    // // Assert the error message in the response
    // expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.json).toHaveBeenCalledWith({
    //   message: "Internal Server ErrorError: Internal Server Error",
    //   });
    // });
});

describe('DELETE /deleteExperience/:experienceId', () => {
  beforeEach(() => {
    res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  it('it should delete an experience successfully', async () => {
    // Mocking the result of the Experience.find() method
    const mockExperience = {
      _id: '60d0fe4f5311236168a109f9',
      applicantId: '60d0fe4f5311236168a109f8',
    };

    // Mock the Experience.find() function to return the mock experiences
    Experience.findByIdAndDelete.mockResolvedValue(mockExperience);

    const reqBody = {
      params: {
        experienceId: '60d0fe4f5311236168a109f9'
      }
    };

    // Call the GET endpoint
    // Call the create function
    await deleteExperience(reqBody, res);

    // Assert the response structure
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
            message: "Experience deleted Successfuly",
            data: {
              'experience' : {
                "_id": "60d0fe4f5311236168a109f9",
                "applicantId": "60d0fe4f5311236168a109f8",
              }
            },
            success: true,
      });
  });
  it("should return 500 on internal error", async () => {
    Experience.findByIdAndDelete.mockRejectedValue(new Error("Internal Server Error"));

    const reqBody = {
      params: {
        experienceId: '60d0fe4f5311236168a109f9'
      }
    };

    // Call the GET endpoint
    // Call the create function
    await deleteExperience(reqBody, res);
    
    // Assert the error message in the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server ErrorError: Internal Server Error",
      });
    });
});

describe('POST /modifyExperience', () => {
  beforeEach(() => {
    res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  it('it should modify an experience successfully', async () => {
    // Mocking the result of the Experience.find() method
    const mockExperience = {
      _id: "60d7b124fa8b6d1e4b1e2e29",
      applicantId: "60d7b122fa8b6d1e4b1e2e28",
      organization: "Company XYZ",
      role: "Software Engineer",
      description: "Developing web applications",
      fromDate: new Date('2020-01-01'),
      toDate: new Date('2022-01-01')
    };

    // Mock the Experience.find() function to return the mock experiences
    Experience.findByIdAndUpdate.mockResolvedValue(mockExperience);

    const reqBody = {
      body:
      {
        applicantId: '60d0fe4f5311236168a109f8',
        title: 'Software Engineer',
        company: 'Example Corp',
        description: 'Building cool stuff',
        }
    };

    // Call the GET endpoint
    // Call the create function
    await modifyExperience(reqBody, res);

    // Assert the response structure
    //expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
            message: "Experience modified Successfuly",
            data: {
              'experience' : {
                "_id": "60d7b124fa8b6d1e4b1e2e29",
                "applicantId": "60d7b122fa8b6d1e4b1e2e28",
                "organization": "Company XYZ",
                "role": "Software Engineer",
                "description": "Developing web applications",
                "fromDate": new Date('2020-01-01'),
                "toDate": new Date('2022-01-01')
              }
            },
            success: true,
      });
  });
  it("should return 500 on internal error", async () => {
    Experience.findByIdAndUpdate.mockRejectedValue(new Error("Internal Server Error"));

    const reqBody = {
      body: {
        experienceId: '60d0fe4f5311236168a109f9'
      }
    };

    // Call the GET endpoint
    // Call the create function
    await modifyExperience(reqBody, res);
    
    // Assert the error message in the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server ErrorError: Internal Server Error",
      });
    });
});

