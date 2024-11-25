import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

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

interface ExperienceModalProps {
  experience?: Experience | null;
  onClose: () => void;
  onSuccess: () => void;
}

const ExperienceModal = ({ experience, onClose, onSuccess }: ExperienceModalProps) => {
  const userId = useUserStore((state) => state.id);
  const [formData, setFormData] = useState({
    organization: '',
    role: '',
    description: '',
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        organization: experience.organization,
        role: experience.role,
        description: experience.description || '',
        fromDate: new Date(experience.fromDate).toISOString().split('T')[0],
        toDate: experience.toDate ? new Date(experience.toDate).toISOString().split('T')[0] : ''
      });
    }
  }, [experience]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (experience) {
        response = await axios.put('http://localhost:8000/api/v1/profile/modify-experience', {
          _id: experience._id,
          ...formData,
          applicantId: userId
        });
      } else {
        response = await axios.post('http://localhost:8000/api/v1/profile/create-experience', {
          ...formData,
          applicantId: userId
        });
      }

      if (response.data.success) {
        toast.success(experience ? 'Experience updated successfully' : 'Experience added successfully');
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience');
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
      <DialogTitle>{experience ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
              <TextField
                type="date"
                label="To Date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
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
            {experience ? 'Update Experience' : 'Add Experience'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExperienceModal;
