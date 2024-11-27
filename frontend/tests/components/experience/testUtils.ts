import axios from 'axios';
import { vi } from 'vitest';

export const mockEducations = [
  {
    _id: "1",
    school_name: "Test University",
    level: "Bachelor's Degree",
    field_of_study: "Computer Science",
    description: "Test description",
    fromDate: "2020-01-01",
    toDate: "2024-01-01"
  }
];

export const setupMocks = () => {
  vi.clearAllMocks();
  
  // Mock useUserStore
  vi.mock("../../../../src/store/UserStore", () => ({
    useUserStore: (selector: any) => 
      selector({
        id: "123",
      })
  }));

  // Mock react-toastify
  vi.mock('react-toastify', () => ({
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    }
  }));

  // Default successful response for getting educations
  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      success: true,
      data: {
        education: mockEducations
      }
    }
  });
}; 