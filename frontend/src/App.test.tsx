import { screen, render, fireEvent } from "@testing-library/react";
import Speech from "./main/speech/Speech";

import App from "./App";
import LiveMessageWebSocket from "./main/speech/LiveMessageWebSocket";
import axios from "axios";
import { MemoryRouter } from "react-router";

const MockedApp = () => {
  return (
    <MemoryRouter>
      <App></App>
    </MemoryRouter>
  );
};
jest.mock("axios");
jest.mock("./main/speech/Speech");
jest.mock("./main/speech/LiveMessageWebSocket");

beforeAll(() => {
  jest
    .spyOn(Speech.prototype, "onSpeechRecognitioned")
    .mockImplementation(() => {});
  jest
    .spyOn(LiveMessageWebSocket.prototype, "sendMessage")
    .mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Testing App", () => {
  it("Should able to click Helper", async () => {
    (axios as any).mockImplementation((url: any) => {
      if (url.url.endsWith("channels"))
        return Promise.resolve({
          data: [
            {
              id: "1",
              name: "Java coders",
            },
          ],
        });
      else
        return Promise.resolve({
          data: "8c6ea344-6a88-4c06-9390-c2d9eda6ea3e",
        });
    });

    render(<MockedApp />);

    const helper = screen.getByText("Helper");
    fireEvent.click(helper);

    await screen
      .findByText("SubId : 8c6ea344-6a88-4c06-9390-c2d9eda6ea3e")
      .then((el) => expect(el).toBeInTheDocument());
  });
  it("Should able to click Needy", async () => {
    (axios as any).mockResolvedValue({
      data: "8c6ea344-6a88-4c06-9390-c2d9eda6ea3e",
    });

    render(<MockedApp />);

    const helper = screen.getByText("Needy");
    fireEvent.click(helper);

    await screen
      .findByText("Text Helper")
      .then((el) => expect(el).toBeInTheDocument());
  });
});
