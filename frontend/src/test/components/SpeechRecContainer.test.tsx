import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Speech from "../../main/speech/Speech";
import SpeechRecContainer from "../../main/components/SpeechRecContainer";

jest.mock("../../main/speech/Speech");

beforeAll(() => {
  jest
    .spyOn(Speech.prototype, "onSpeechRecognitioned")
    .mockImplementation(() => {});
});
const MockedSpeechRecContainer = () => {
  return (
    <MemoryRouter>
      <SpeechRecContainer />
    </MemoryRouter>
  );
};
afterEach(() => {
  jest.restoreAllMocks();
});

describe("Testing SpeechRecContainer", () => {
  it("Should render SpeechRecContainer", () => {
    render(<MockedSpeechRecContainer />);
  });
});
