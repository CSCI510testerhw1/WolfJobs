import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import axios from "axios";
import { login } from "../../deprecateded/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";

type FormValues = {
  name: string;
  email: string;
  password: string;
  address: string;
  role: string;
  skills: string[];
  phonenumber: string;
  availability: string;
  gender: string;
  hours: string;
};

const ProfileEdit = ({ props }: { props: any }) => {
  const {
    name,
    email,
    address,
    role,
    skills,
    phonenumber,
    availability,
    gender,
    hours,
  } = props;

  const form = useForm<FormValues>({
    defaultValues: {
      name: name,
      email: email,
      address: address,
      role,
      skills: skills,
      phonenumber: phonenumber,
      availability: availability,
      gender: gender,
      hours: hours,
    },
  });

  const [availabilityDrop, setAvailabilityDtop] = useState(availability);
  const [skillsDB, setSkillsDB] = useState<string[]>([]);

  const userId = useUserStore((state) => state.id);
  const password = useUserStore((state) => state.password);

  const navigate = useNavigate();

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  const handleSaveProfile = (data: FormValues) => {
    const url = "http://localhost:8000/api/v1/users/edit";
    const body = {
      id: userId,
      name: data.name,
      role,
      email,
      password,
      address: data.address,
      availability: availabilityDrop,
      hours: data.hours,
      gender: data.gender,
      skills: data.skills,
      phonenumber: data.phonenumber,
    };

    axios.post(url, body).then((res) => {
      if (res.status !== 200) {
        toast.error("Failed to save profile");
        return;
      }
      toast.success("Saved profile");
      login(email, password, navigate);
    });
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/skills"
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setSkillsDB(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setSkillsDB([]);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit(handleSaveProfile)} noValidate>
        <Stack spacing={3} width={"100%"}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <TextField
              label="Name"
              type="text"
              fullWidth
              {...register("name", {
                required: "Name is required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              disabled
              value={email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />

            <TextField
              label="Role"
              type="text"
              fullWidth
              {...register("role")}
              disabled
              value={role}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <TextField
              label="Address"
              type="text"
              fullWidth
              {...register("address")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />

            <TextField
              label="Phone number"
              type="text"
              fullWidth
              {...register("phonenumber")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Skills & Availability</h2>
            <Autocomplete
              multiple
              options={skillsDB}
              defaultValue={skills}
              onChange={(_, value) => setValue("skills", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  error={!!errors.skills}
                  helperText={errors.skills?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              )}
            />

            <FormControl fullWidth>
              <InputLabel id="available-id">Availability</InputLabel>
              <Select
                value={availabilityDrop}
                labelId="available-id"
                label="Availability"
                onChange={(e: SelectChangeEvent) =>
                  setAvailabilityDtop(e.target.value)
                }
                sx={{
                  borderRadius: "8px",
                }}
              >
                <MenuItem value={"4 Hours"}>4 Hours</MenuItem>
                <MenuItem value={"8 Hours"}>8 Hours</MenuItem>
                <MenuItem value={"12 Hours"}>12 Hours</MenuItem>
                <MenuItem value={"16 Hours"}>16 Hours</MenuItem>
                <MenuItem value={"20 Hours"}>20 Hours</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Gender"
              type="text"
              fullWidth
              {...register("gender")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              background: "#FF5353",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "16px",
              padding: "12px",
              marginTop: "16px",
            }}
          >
            Save Profile
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default ProfileEdit;
