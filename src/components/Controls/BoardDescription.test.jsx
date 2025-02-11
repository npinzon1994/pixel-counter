import { render, screen } from "@testing-library/react";
import BoardDescription from "./BoardDescription";
import { describe, it, expect, vi } from "vitest";
import { Typography } from "@mui/material";

// Mock MUI's Typography component
vi.mock("@mui/material", () => ({
  Typography: ({ children }) => <div data-testid="Typography">{children}</div>,
}));

describe("BoardDescription Component", () => {
  const mockTheme = {
    palette: {
      text: {
        smallText: "#666", // Mocked color value
      },
    },
  };

  it("renders the component correctly with given props", () => {
    render(<BoardDescription theme={mockTheme} name="Test Board" size="500x500" />);

    // Check if the name text is displayed
    expect(screen.getByText("Test Board")).toBeInTheDocument();

    // Check if the size text is displayed
    expect(screen.getByText("500x500")).toBeInTheDocument();
  });

  it("renders Typography components correctly", () => {
    render(<BoardDescription theme={mockTheme} name="Test Board" size="500x500" />);

    // Ensure Typography components are rendered
    const typographyElements = screen.getAllByTestId("Typography");
    expect(typographyElements).toHaveLength(2);

    // Ensure they contain correct text
    expect(typographyElements[0]).toHaveTextContent("Test Board");
    expect(typographyElements[1]).toHaveTextContent("500x500");
  });
});