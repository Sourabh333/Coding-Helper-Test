import { screen, render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ModeSelector from "../../main/components/ModeSelector";
const MockedModeSelector = () => {
  return (
    <MemoryRouter>
      <ModeSelector />
    </MemoryRouter>
  );
};
describe("Testing ModeSelector", () => {
  it("Should render Helper and Needy button", () => {
    render(<MockedModeSelector />);
    expect(
      screen.getByRole("button", {
        name: "Helper",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Needy",
      })
    ).toBeInTheDocument();
  });
  it("Should able to click Helper", async () => {
    render(<MockedModeSelector />);

    const helper = screen.getByTestId("link-helper");
    fireEvent.click(helper);
  });
  it("Should able to click Needy", async () => {
    render(<MockedModeSelector />);

    const helper = screen.getByText("Needy");
    fireEvent.click(helper);
  });
});
