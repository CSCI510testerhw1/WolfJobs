import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ExperienceModal from "../../../src/components/ExperienceModal";
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

describe("ExperienceModal Component", () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();
  
  const mockExperience = {
    _id: "1",
    organization: "Test Company",
    role: "Software Engineer",
    description: "Test description",
    fromDate: "2023-01-01",
    toDate: "2023-12-31"
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders edit experience modal with pre-filled data", () => {
    render(
      <ExperienceModal
        experience={mockExperience}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText("Edit Experience")).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /organization/i })).toHaveValue("Test Company");
    expect(screen.getByRole('textbox', { name: /role/i })).toHaveValue("Software Engineer");
    expect(screen.getByRole('textbox', { name: /description/i })).toHaveValue("Test description");
    expect(screen.getByTestId('fromDate')).toHaveValue("2023-01-01");
 expect(screen.getByTestId('toDate')).toHaveValue("2023-12-31");
  });

  it("handles form submission for new experience", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { success: true }
    });

    render(
      <ExperienceModal
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    // Fill in the form
    fireEvent.change(screen.getByRole('textbox', { name: /organization/i }), {
      target: { value: "New Company" }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /role/i }), {
      target: { value: "Senior Developer" }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /description/i }), {
      target: { value: "New role description" }
    });
    fireEvent.change(screen.getByTestId('fromDate'), {
        target: { value: "2024-01-01" }
      });
      fireEvent.change(screen.getByTestId('toDate'), {
        target: { value: "2024-12-31" }
      });
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add experience/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/profile/create-experience',
        expect.objectContaining({
          organization: "New Company",
          role: "Senior Developer",
          description: "New role description",
          fromDate: "2024-01-01",
          toDate: "2024-12-31"
        })
      );
    });

    expect(toast.success).toHaveBeenCalledWith("Experience added successfully");
    expect(mockOnSuccess).toHaveBeenCalled();
  });
}); 