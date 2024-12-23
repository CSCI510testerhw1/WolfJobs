import { AiOutlineClose } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import EducationSection from '../../components/EducationSection';
import ExperienceSection from '../../components/ExperienceSection';
import ProfileEdit from "./ProfileEdit";
import { useState } from "react";
import { useUserStore } from "../../store/UserStore";

const Profile = () => {
  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const address = useUserStore((state) => state.address);
  const role = useUserStore((state) => state.role);
  const skills = useUserStore((state) => state.skills);
  const phonenumber = useUserStore((state) => state.phonenumber);
  const affiliation = useUserStore((state) => state.affiliation);
  const availability = useUserStore((state) => state.availability);
  const gender = useUserStore((state) => state.gender);
  const hours = useUserStore((state) => state.hours);
  const resume = useUserStore((state) => state.resume);
  const userId = useUserStore((state) => state.id);
  const [recommendation, setRecommendation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const widthCard = "700px";
  const [editMode, setEditMode] = useState(false);

  const getCareerRecommendation = async () => {
    if (!userId) {
      console.error("No user ID available");
      return;
    }
     setIsLoading(true);
    try {
      console.log("Fetching recommendation for user:", userId);
      const response = await fetch(`http://localhost:8000/api/v1/profile/get-recommendation/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if required
          // 'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setRecommendation(data.recommendation);
        setError("");
      } else {
        setError(data.message);
        setRecommendation("");
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setError("An error occurred while fetching the recommendation");
    } finally {
      setIsLoading(false);
    }
  };

  const props = {
    name,
    email,
    address,
    role,
    skills,
    phonenumber,
    affiliation,
    availability,
    gender,
    hours,
  };

  return (
    <div
      className="flex flex-col items-center justify-start bg-gray-100 min-h-screen"
      style={{ paddingTop: "2rem" }}
    >
      <div
        className="flex flex-col bg-white rounded-xl shadow-md mb-8"
        style={{ width: `${widthCard}` }}
      >
        {/* Header Section */}
        <div className="bg-red-600 h-32 rounded-t-xl relative">
          <div className="absolute bottom-0 left-8 transform translate-y-1/2">
            <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center">
              <span className="text-4xl text-gray-600">
                {name?.[0]?.toUpperCase() || "?"}
              </span>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            {editMode ? (
              <AiOutlineClose
                className="text-white text-xl cursor-pointer"
                onClick={() => setEditMode(false)}
              />
            ) : (
              <BiSolidPencil
                className="text-white text-xl cursor-pointer"
                onClick={() => setEditMode(true)}
              />
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pt-20 pb-8">
          {!editMode && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold">{name || "No Name"}</h1>
                <p className="text-gray-600">{role || "No Role"}</p>
                <p className="text-gray-500 text-sm">{address || "No Location"}</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg">
                  <h2 className="text-lg font-semibold mb-3">
                    Contact Information
                  </h2>
                  <div className="space-y-2 text-gray-600">
                    <p>Email: {email || " -- "}</p>
                    <p>Phone: {phonenumber || " -- "}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg">
                  <h2 className="text-lg font-semibold mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.length > 0 ? (
                      skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No skills listed</span>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Career Recommendation</h2>
                    <button
                      onClick={getCareerRecommendation}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Getting Recommendation..." : "Get Recommendation"}
                    </button>
                  </div>
                  
                  {isLoading && (
                    <div className="text-gray-600 p-4 bg-gray-50 rounded-lg">
                      Loading recommendation...
                    </div>
                  )}
                  
                  {!isLoading && recommendation && (
                    <div className="text-gray-600 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      {recommendation}
                    </div>
                  )}
                  
                  {!isLoading && error && (
                    <div className="text-red-600 p-4 bg-red-50 rounded-lg border border-red-100">
                      <p className="font-medium mb-2">Unable to generate recommendation</p>
                      <p>{error}</p>
                    </div>
                  )}
                </div>

                {/* Experience Section */}
                <ExperienceSection />

                {/* Education Section */}
                <EducationSection />

                <div className="bg-white rounded-lg">
                  <h2 className="text-lg font-semibold mb-3">
                    Additional Information
                  </h2>
                  <div className="space-y-2 text-gray-600">
                    {!!affiliation && <p>Affiliation: {affiliation}</p>}
                    <p>Availability: {availability || " -- "}</p>
                    <p>Gender: {gender || " -- "}</p>
                    {resume && (
                      <p>
                        Resume:{" "}
                        <span className="text-blue-600 cursor-pointer">
                          {resume.split("/").pop()}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {editMode && <ProfileEdit props={props} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
