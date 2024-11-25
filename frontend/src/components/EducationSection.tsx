import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import EducationModal from "./EducationModal";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserStore } from '../store/UserStore';

interface Education {
    _id: string;
    school_name: string;
    level: string;
    field_of_study: string;
    description?: string;
    fromDate: string;
    toDate?: string;
  }

const EducationSection = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const userId = useUserStore((state) => state.id);

  const fetchEducations = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/profile/get-all-education/${userId}`);
      if (response.data.success) {
        setEducations(response.data.data.education);
      }
    } catch (error) {
      console.error("Error fetching educations:", error);
      toast.error("Failed to load educations");
    }
  };

  useEffect(() => {
    fetchEducations();
  }, [userId]);

  const handleDelete = async (educationId: string) => {
    if (window.confirm('Are you sure you want to delete this education?')) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/v1/profile/delete-education/${educationId}`);
        if (response.data.success) {
          toast.success('Education deleted successfully');
          fetchEducations();
        }
      } catch (error) {
        console.error("Error deleting education:", error);
        toast.error("Failed to delete education");
      }
    }
  };

  const handleEdit = (education: Education) => {
    setEditingEducation(education);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={() => {
            setEditingEducation(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <FaPlus /> Add Education
        </button>
      </div>

      <div className="space-y-6">
        {educations.map((edu) => (
          <div key={edu._id} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{edu.level}</h3>
                <p className="text-gray-700">{edu.school_name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(edu.fromDate).toLocaleDateString()} - 
                  {edu.toDate ? new Date(edu.toDate).toLocaleDateString() : 'Present'}
                </p>
                <p className="text-gray-600">{edu.field_of_study}</p>
                {edu.description && (
                  <p className="text-gray-600 mt-2">{edu.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(edu._id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
        {educations.length === 0 && (
          <p className="text-gray-500 text-center py-4">No education added yet</p>
        )}
      </div>

      {showModal && (
        <EducationModal
          education={editingEducation}
          onClose={() => {
            setShowModal(false);
            setEditingEducation(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingEducation(null);
            fetchEducations();
          }}
        />
      )}
    </div>
  );
};

export default EducationSection;
