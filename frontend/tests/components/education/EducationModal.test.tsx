import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import EducationModal from "../../../src/components/EducationModal";
import axios from 'axios';
import { toast } from 'react-toastify';
import { vi } from 'vitest';

// Mock axios and toast
vi.mock('axios');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("EducationModal Component", () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();
  
  const mockEducation = {
    _id: "1",
    school_name: "Test University",
    level: "Bachelor's",
    field_of_study: "Computer Science",
    description: "Test description",
    fromDate: "2023-01-01",
    toDate: "2023-12-31"
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders edit education modal with pre-filled data", () => {
    render(
      <EducationModal
        education={mockEducation}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText("Edit Education")).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /school\/institution name/i })).toHaveValue("Test University");
    expect(screen.getByRole('textbox', { name: /degree level/i })).toHaveValue("Bachelor's");
    expect(screen.getByRole('textbox', { name: /field of study/i })).toHaveValue("Computer Science");
    expect(screen.getByRole('textbox', { name: /description/i })).toHaveValue("Test description");
    expect(screen.getByLabelText(/from date/i)).toHaveValue("2023-01-01");
    expect(screen.getByLabelText(/to date/i)).toHaveValue("2023-12-31");
  });

  it("handles form submission for new education", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { success: true }
    });

    render(
      <EducationModal
        education={null}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Fill in the form
    fireEvent.change(screen.getByRole('textbox', { name: /school\/institution name/i }), {
      target: { value: "New University" }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /degree level/i }), {
      target: { value: "Master's" }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /field of study/i }), {
      target: { value: "Data Science" }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /description/i }), {
      target: { value: "New education description" }
    });
    fireEvent.change(screen.getByLabelText(/from date/i), {
      target: { value: "2024-01-01" }
    });
    fireEvent.change(screen.getByLabelText(/to date/i), {
      target: { value: "2024-12-31" }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add education/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/profile/create-education',
        expect.objectContaining({
          school_name: "New University",
          level: "Master's",
          field_of_study: "Data Science",
          description: "New education description",
          fromDate: "2024-01-01",
          toDate: "2024-12-31"
        })
      );
    });

    expect(toast.success).toHaveBeenCalledWith("Education added successfully");
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it("handles form submission for updating education", async () => {
    mockedAxios.put.mockResolvedValueOnce({
      data: { success: true }
    });

    render(
      <EducationModal
        education={mockEducation}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Modify a field
    fireEvent.change(screen.getByRole('textbox', { name: /school\/institution name/i }), {
      target: { value: "Updated University" }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /update education/i }));

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/profile/modify-education',
        expect.objectContaining({
          _id: "1",
          school_name: "Updated University",
          level: "Bachelor's",
          field_of_study: "Computer Science",
          description: "Test description",
          fromDate: "2023-01-01",
          toDate: "2023-12-31"
        })
      );
    });

    expect(toast.success).toHaveBeenCalledWith("Education updated successfully");
    expect(mockOnSuccess).toHaveBeenCalled();
  });
}); 