import { MemoryRouter } from "react-router-dom";
import Profile from "../../../src/Pages/Profile/Profile";
import React from "react";
import { render } from "@testing-library/react";

describe("Profile", () => {
  it("renders Profile", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
  });
});
