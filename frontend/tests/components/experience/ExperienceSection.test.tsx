import { render, screen } from "@testing-library/react";

import ExperienceSection from "../../../src/components/ExperienceSection";
import axios from 'axios';
import { setupMocks } from './testUtils';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Experience Section Rendering", () => {
  beforeEach(() => {
    setupMocks();
  });

  it("renders experience section with add button", async () => {
    render(<ExperienceSection />);
    
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Add Experience")).toBeInTheDocument();
  });

  it("displays experience data correctly", async () => {
    // Mock the experience data response
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          experience: [{
            _id: "1",
            organization: "Test Company",
            role: "Software Engineer",
            description: "Test description",
            fromDate: "2023-01-01",
            toDate: "2023-12-31"
          }]
        }
      }
    });

    render(<ExperienceSection />);
    
    await screen.findByText("Test Company");
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("shows empty state when no experience data exists", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          experience: []
        }
      }
    });

    render(<ExperienceSection />);
    
    await screen.findByText("No experience added yet");
  });
}); 