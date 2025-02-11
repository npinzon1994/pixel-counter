import { render, screen, fireEvent } from "@testing-library/react";
import BoardPicker from "./BoardPicker";
import ControlsContext from "../../context/controls-context";
import { ThemeProvider, createTheme } from "@mui/material";

vi.mock("./BoardDescription", () => ({
  default: () => <div data-testid="board-description" />,
}));

describe("BoardPicker Component", () => {
  const mockSetBoardSize = vi.fn();
  const renderWithProviders = (boardSize) => {
    const mockTheme = createTheme({
      palette: { mode: "light", text: { heading: "#000" } },
      typography: { small: "0.75rem" },
    });

    return render(
      <ThemeProvider theme={mockTheme}>
        <ControlsContext.Provider
          value={{ boardSize, setBoardSize: mockSetBoardSize }}
        >
          <BoardPicker />
        </ControlsContext.Provider>
      </ThemeProvider>
    );
  };

  const renderWithTheme = (selectedMode) => {
    const theme = createTheme({
      palette: {
        mode: selectedMode,
      },
    });

    return render(
      <ThemeProvider theme={theme}>
        <BoardPicker />
      </ThemeProvider>
    );
  };

  it("renders BoardPicker with all toggle buttons", () => {
    renderWithProviders("mini");
    expect(screen.getByText("Board Size")).toBeInTheDocument();
    expect(screen.getByLabelText("perler mini pegboard")).toBeInTheDocument();
    expect(screen.getByLabelText("perler large pegboard")).toBeInTheDocument();
    expect(
      screen.getByLabelText("perler super portrait pegboard")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("perler super landscape pegboard")
    ).toBeInTheDocument();
  });

  it("selects a board size when a button is clicked", () => {
    renderWithProviders("mini");
    const largeButton = screen.getByLabelText("perler large pegboard");
    fireEvent.click(largeButton);
    expect(mockSetBoardSize).toHaveBeenCalledWith("large");
  });

  it("does not change board size if the same button is clicked", () => {
    renderWithProviders("mini");
    const miniButton = screen.getByLabelText("perler mini pegboard");
    fireEvent.click(miniButton);
    expect(mockSetBoardSize).toHaveBeenCalledTimes(1);

    fireEvent.click(miniButton);
    expect(mockSetBoardSize).toHaveBeenCalledTimes(1);
  });

  it("displays the correct board description for each size", () => {
    renderWithProviders("large");
    expect(screen.getAllByTestId("board-description").length).toBe(4);
  });

  it("should apply correct colors based on theme mode (dark mode)", () => {
    const { container } = renderWithTheme("dark");

    // Get the elements where colors are applied
    const selectedIcon = container.querySelector("svg");
    const icon = container.querySelectorAll("svg")[1];
    const selectedText = container.querySelector("Typography");
    const text = container.querySelectorAll("Typography")[1];

    // Check if the colors match the expected values for dark mode
    expect(selectedIcon).toHaveStyle("fill: #7292ff");
    expect(selectedText).toHaveStyle("color: #b1c2ff");
    expect(icon).toHaveStyle("fill: rgb(255, 255, 255)");
    expect(text).toHaveStyle("color: rgb(255, 255, 255)");
  });

  it("should apply correct colors based on theme mode (light mode)", () => {
    const { container } = renderWithTheme("light");

    // Get the elements where colors are applied
    const selectedIcon = container.querySelector("svg");
    const icon = container.querySelectorAll("svg")[1];
    const selectedText = container.querySelector("Typography");
    const text = container.querySelectorAll("Typography")[1];

    // Check if the colors match the expected values for light mode
    expect(selectedIcon).toHaveStyle("color: #3b68ff");
    expect(selectedText).toHaveStyle("color: #3b68ff");
    expect(icon).toHaveStyle("color: rgba(0, 0, 0, 0.54)");
    expect(text).toHaveStyle("color: #3b68ff");
  });
});
