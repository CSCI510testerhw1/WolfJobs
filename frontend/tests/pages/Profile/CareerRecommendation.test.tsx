import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Profile from "../../../src/Pages/Profile/Profile";
import React from "react";
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';

// Mock the useUserStore hook
vi.mock("../../../src/store/UserStore", () => ({
  useUserStore: (selector: any) => 
    selector({
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      skills: ["JavaScript", "React"],
      role: "Developer",
      address: "Test Address",
      phonenumber: "1234567890",
      affiliation: "Test Company",
      availability: "Full Time",
      gender: "Male",
      hours: "40",
      resume: "resume.pdf"
    })
}));

describe("Career Recommendation", () => {
  // Mock fetch globally
  const originalFetch = global.fetch;
  
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("renders recommendation button", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    
    const button = screen.getByText("Get Recommendation");
    expect(button).toBeInTheDocument();
  });

  it("shows loading state when fetching recommendation", async () => {
    // Mock fetch to return a pending promise
    (global.fetch as any).mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    
    const button = screen.getByText("Get Recommendation");
    
    await act(async () => {
      button.click();
    });

   
    const loadingText = screen.getByText("Getting Recommendation...");
    expect(loadingText).toBeInTheDocument();
  });
}); 