import { render, screen } from "@testing-library/react";

import EducationSection from "../../../src/components/EducationSection";
import axios from 'axios';
import { setupMocks } from './testUtils';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Education Section Rendering", () => {
  beforeEach(() => {
    setupMocks();
  });

  it("renders education section with add button", async () => {
    render(<EducationSection />);
    
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Add Education")).toBeInTheDocument();
  });

  it("displays education data correctly", async () => {
    render(<EducationSection />);
    
    await screen.findByText("Test University");
    expect(screen.getByText("Bachelor's Degree")).toBeInTheDocument();
    expect(screen.getByText("Computer Science")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("shows empty state when no education data exists", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          education: []
        }
      }
    });

    render(<EducationSection />);
    
    await screen.findByText("No education added yet");
  });
}); 