import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

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

interface EducationModalProps {
  education: Education | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EducationModal = ({ education, onClose, onSuccess }: EducationModalProps) => {
  const userId = useUserStore((state) => state.id);
  const [formData, setFormData] = useState({
    school_name: '',
    level: '',
    field_of_study: '',
    description: '',
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    if (education) {
      setFormData({
        school_name: education.school_name,
        level: education.level,
        field_of_study: education.field_of_study,
        description: education.description || '',
        fromDate: new Date(education.fromDate).toISOString().split('T')[0],
        toDate: education.toDate ? new Date(education.toDate).toISOString().split('T')[0] : ''
      });
    }
  }, [education]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        applicantId: userId,
        ...formData
      };

      let response;
      if (education) {
        response = await axios.put(`http://localhost:8000/api/v1/profile/modify-education`, {
          _id: education._id,
          ...payload
        });
      } else {
        response = await axios.post(`http://localhost:8000/api/v1/profile/create-education`, payload);
      }

      if (response.data.success) {
        toast.success(education ? 'Education updated successfully' : 'Education added successfully');
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving education:', error);
      toast.error('Failed to save education');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{education ? 'Edit Education' : 'Add Education'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="School/Institution Name"
              name="school_name"
              value={formData.school_name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Degree Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Field of Study"
              name="field_of_study"
              value={formData.field_of_study}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                type="date"
                label="From Date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                type="date"
                label="To Date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit"
            variant="contained" 
            style={{
              background: "#FF5353",
              color: "white",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "16px",
              padding: "8px 24px"
            }}
          >
            {education ? 'Update Education' : 'Add Education'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EducationModal;
