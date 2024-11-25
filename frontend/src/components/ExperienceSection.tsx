import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import ExperienceModal from "./ExperienceModal";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserStore } from '../store/UserStore';

interface Experience {
  _id: string;
  organization: string;
  role: string;
  description?: string;
  fromDate: string;
  toDate?: string;
}

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const userId = useUserStore((state) => state.id);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/profile/get-all-experience/${userId}`);
      if (response.data.success) {
        setExperiences(response.data.data.experience);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast.error("Failed to load experiences");
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [userId]);

  const handleDelete = async (experienceId: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/v1/profile/delete-experience/${experienceId}`);
        if (response.data.success) {
          toast.success('Experience deleted successfully');
          fetchExperiences();
        }
      } catch (error) {
        console.error("Error deleting experience:", error);
        toast.error("Failed to delete experience");
      }
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <button
          onClick={() => {
            setEditingExperience(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <FaPlus /> Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp._id} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{exp.role}</h3>
                <p className="text-gray-700">{exp.organization}</p>
                <p className="text-sm text-gray-500">
                  {new Date(exp.fromDate).toLocaleDateString()} - 
                  {exp.toDate ? new Date(exp.toDate).toLocaleDateString() : 'Present'}
                </p>
                {exp.description && (
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <p className="text-gray-500 text-center py-4">No experience added yet</p>
        )}
      </div>

      {showModal && (
        <ExperienceModal
          experience={editingExperience}
          onClose={() => {
            setShowModal(false);
            setEditingExperience(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingExperience(null);
            fetchExperiences();
          }}
        />
      )}
    </div>
  );
};

export default ExperienceSection;
