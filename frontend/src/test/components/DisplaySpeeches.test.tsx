import { screen, render } from "@testing-library/react";
import DisplaySpeeches from "../../main/components/DisplaySpeeches";
import { TranscriptProps } from "../../main/speech/Speech";

describe("Testing DisplaySpeeched", () => {
  it("Should render list data", () => {
    const speeches: TranscriptProps[] = [
      "Hello from vijay",
      "Hello Ram",
      "Hello Rahul",
    ].map((item) => {
      return {
        final: item,
        interim: "",
      };
    });
    render(<DisplaySpeeches speeches={speeches} />);
    const item1 = screen.getByTestId("speech-0");
    expect(item1).toBeInTheDocument();
    const items = screen.queryAllByTestId(/speech-/i);
    items.forEach((item, index) => {
      expect(item.textContent).toEqual(speeches[index].final + " ");
    });
    expect(items.length).toEqual(speeches.length);
  });
});
