import { screen, render, fireEvent } from "@testing-library/react";
import RecognitionControl from "../../main/components/RecognitionControl";
import Speech from "../../main/speech/Speech";

jest.mock("../../main/speech/Speech");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Testing RecognitionControl", () => {
  it("Should render start and stop button", () => {
    const speech = new Speech();
    render(<RecognitionControl speech={speech} />);
    const start = screen.getByText("Start");
    expect(start).toBeInTheDocument();
    const stop = screen.getByText("Stop");
    expect(stop).toBeInTheDocument();
  });
  it("Should call start and stop method on Speech", async () => {
    const speech = new Speech();
    const startSpeechRecognition = speech.startSpeechRecognition as jest.Mock;
    const stopSpeechRecognition = speech.stopSpeechRecognition as jest.Mock;
    render(<RecognitionControl speech={speech} />);
    const start = screen.getByText("Start");
    const stop = screen.getByText("Stop");
    fireEvent.click(start);
    expect(startSpeechRecognition.mock.calls.length).toEqual(1);
    fireEvent.click(stop);
    expect(stopSpeechRecognition.mock.calls.length).toEqual(1);
  });
});
