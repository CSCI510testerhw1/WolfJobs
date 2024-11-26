const { createEducation } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const { getAllEducation } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const { deleteEducation } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const { modifyEducation } = require("../controllers/api/v1/profile_apis"); // Update with your actual path
const Education = require("../models/education");
const Experience = require("../models/experience");
const request = require('supertest');
const mockingoose = require("mockingoose");
const User = require("../models/user");

require("dotenv").config();
jest.mock("../models/education");
jest.mock("../models/experience");

const mockEducationGen = {
    _id: "60d7b124fa8b6d1e4b1e2e30",
    applicantId: "60d7b122fa8b6d1e4b1e2e28",
    degree: "BSc in Computer Science",
    institution: "University ABC",
    fromDate: new Date('2015-01-01'),
    toDate: new Date('2019-01-01')
  };

describe('POST /createEducation', () => {

    beforeEach(() => {
        res = {
          set: jest.fn().mockReturnThis(),
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      });

  it('should successfully create an education and return a 200 status', async () => {
    // Mocking a sample education to be returned by the mocked method
    const mockEducation = {
      _id: '60d0fe4f5311236168a109f9',
      applicantId: '60d0fe4f5311236168a109f8',
    };
    
    // Mock the Education.create() function to return the mock data
    Education.create.mockResolvedValue(mockEducation);

    const reqBody = mockEducationGen;
    // Call the create function
    await createEducation(reqBody, res);

    // Assert the response structure
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.set).toHaveBeenCalledWith("Access-Control-Allow-Origin", "*");
    expect(res.json).toHaveBeenCalledWith({
            message: "Education Created Successfuly",
            data: {
              'education': "60d0fe4f5311236168a109f9",
              'user': '60d0fe4f5311236168a109f8'
            },
            success: true,
    });
  });

  it('should return 500 if there is an error while creating an experience', async () => {
    // Mock the Experience.create() to throw an error
    Education.create.mockRejectedValue(new Error('Database error'));

    const reqBody = {
      applicantId: '60d0fe4f5311236168a109f8',
      title: 'Software Engineer',
      company: 'Example Corp',
      description: 'Building cool stuff',
    };

    // Call the POST endpoint
    await createEducation(reqBody, res);

    // Assert the error message in the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server ErrorError: Database error",
    });

  });
});

describe('GET /getEducation', () => {
  beforeEach(() => {
    res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  it('should successfully retrieve all Educations for an applicant', async () => {
    // Mocking the result of the Education.find() method
    // const mockEducations = [
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

    // // Mock the Education.find() function to return the mock Educations
    // Education.find.mockResolvedValue(mockEducations);

    // // Education.sort.mockResolvedValue(mockEducations.sort());

    // const reqBody = {
    //   params: {
    //     applicantId: '60d0fe4f5311236168a109f8',
    //     EducationId: '60d0fe4f5311236168a109f9'
    //   }
    // };

    // // Call the GET endpoint
    // // Call the create function
    // await getAllEducation(reqBody, res);

    // // Assert the response structure
    // //expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //         message: "Education retrieved Successfuly",
    //         data: {
    //           'Education': "60d0fe4f5311236168a109f9",
    //         },
    //         success: true,
    });
});
  it("should return 500 on internal error", async () => {
    // Education.find.mockRejectedValue(new Error("Database Error"));

    // const reqBody = {
    //   params: {
    //     applicantId: '60d0fe4f5311236168a109f8',
    //     EducationId: '60d0fe4f5311236168a109f9'
    //   }
    // };

    // // Call the GET endpoint
    // // Call the create function
    // await getAllEducation(reqBody, res);
    
    // // Assert the error message in the response
    // expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.json).toHaveBeenCalledWith({
    //   message: "Internal Server ErrorError: Internal Server Error",
    //   });
    // });
});

describe('DELETE /deleteEducation/:educationId', () => {
  beforeEach(() => {
    res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  it('it should delete an education successfully', async () => {
    // Mocking the result of the Education.find() method
    const mockEducation = {
      _id: '60d0fe4f5311236168a109f9',
      applicantId: '60d0fe4f5311236168a109f8',
    };

    // Mock the Education.find() function to return the mock Educations
    Education.findByIdAndDelete.mockResolvedValue(mockEducation);

    const reqBody = {
      params: {
        educationId: '60d0fe4f5311236168a109f9'
      }
    };

    // Call the GET endpoint
    // Call the create function
    await deleteEducation(reqBody, res);

    // Assert the response structure
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
            message: "Education deleted Successfuly",
            data: {
              'education' : {
                "_id": "60d0fe4f5311236168a109f9",
                "applicantId": "60d0fe4f5311236168a109f8",
              }
            },
            success: true,
      });
  });
  it("should return 500 on internal error", async () => {
    Education.findByIdAndDelete.mockRejectedValue(new Error("Internal Server Error"));

    const reqBody = {
      params: {
        educationId: '60d0fe4f5311236168a109f9'
      }
    };

    // Call the GET endpoint
    // Call the create function
    await deleteEducation(reqBody, res);
    
    // Assert the error message in the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server ErrorError: Internal Server Error",
      });
    });
});

describe('POST /modifyEducation', () => {
  beforeEach(() => {
    res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  it('it should modify an education successfully', async () => {
    // Mocking the result of the Education.find() method
    const mockEducation = {
      _id: "60d7b124fa8b6d1e4b1e2e29",
      applicantId: "60d7b122fa8b6d1e4b1e2e28",
      organization: "Company XYZ",
      role: "Software Engineer",
      description: "Developing web applications",
      fromDate: new Date('2020-01-01'),
      toDate: new Date('2022-01-01')
    };

    // Mock the Education.find() function to return the mock Educations
    Education.findByIdAndUpdate.mockResolvedValue(mockEducation);

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
    await modifyEducation(reqBody, res);

    // Assert the response structure
    //expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
            message: "Education modified Successfuly",
            data: {
              'education' : {
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
    Education.findByIdAndUpdate.mockRejectedValue(new Error("Internal Server Error"));

    const reqBody = {
      body: {
        educationId: '60d0fe4f5311236168a109f9'
      }
    };

    // Call the GET endpoint
    // Call the create function
    await modifyEducation(reqBody, res);
    
    // Assert the error message in the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server ErrorError: Internal Server Error",
      });
    });
});

