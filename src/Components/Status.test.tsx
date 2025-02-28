import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Status } from "./Status";
import { RECORDING_STATE } from "../Hook/UseMediaRecorder";

describe("Status Component", () => {
  test("displays Recording in progress message when state is RECORDING", () => {
    render(<Status state={RECORDING_STATE.RECORDING} audioUrl="" />);

    expect(screen.getByText("Recording in progress...")).toBeInTheDocument();
  });

  test("displays Resume message when state is PAUSED", () => {
    render(<Status state={RECORDING_STATE.PAUSED} audioUrl="" />);

    expect(
      screen.getByText(
        "Press resume button to continue recording or stop button to end recording..."
      )
    ).toBeInTheDocument();
  });

  test("displays converting voice message when audioUrl is available", () => {
    render(
      <Status state={RECORDING_STATE.INACTIVE} audioUrl="test-audio.mp3" />
    );

    expect(
      screen.getByText("Converting voice to transcript...")
    ).toBeInTheDocument();
  });

  test("displays CTA record when state is INACTIVE and no audioUrl", () => {
    render(<Status state={RECORDING_STATE.INACTIVE} audioUrl="" />);

    expect(
      screen.getByText("Press record button below to start recording...")
    ).toBeInTheDocument();
  });
});
