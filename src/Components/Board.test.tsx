import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Board, BoardProps } from "./Board";
import { RECORDING_STATE } from "../Hook/UseMediaRecorder";

// Mock status and transcription components because this test is not concerned about the implementation for Status and Transcription components
jest.mock("./Status", () => ({
  Status: jest.fn(() => <div data-testid="status-component">Status</div>),
}));

jest.mock("./Transcription", () => ({
  Transcription: jest.fn(() => (
    <div data-testid="transcription-component">Transcription</div>
  )),
}));

describe("Board component", () => {
  const defaultProps: BoardProps = {
    state: RECORDING_STATE.INACTIVE,
    loading: false,
    transcription: null,
    audioUrl: "test.wav",
  };

  test("renders Transcription when recording state is INACTIVE and transcription is available", () => {
    render(<Board {...defaultProps} transcription="Sample transcription" />);

    expect(screen.getByTestId("transcription-component")).toBeInTheDocument();
    expect(screen.queryByTestId("status-component")).not.toBeInTheDocument();
  });

  test("renders Status when recording state is INACTIVE and transcription is not available", () => {
    render(<Board {...defaultProps} state={RECORDING_STATE.INACTIVE} />);

    expect(screen.getByTestId("status-component")).toBeInTheDocument();
    expect(
      screen.queryByTestId("transcription-component")
    ).not.toBeInTheDocument();
  });

  test("renders Status for active recording states", () => {
    render(<Board {...defaultProps} state={RECORDING_STATE.RECORDING} />);

    expect(screen.getByTestId("status-component")).toBeInTheDocument();
    expect(
      screen.queryByTestId("transcription-component")
    ).not.toBeInTheDocument();
  });

  test("renders Status for paused recording states", () => {
    render(<Board {...defaultProps} state={RECORDING_STATE.PAUSED} />);

    expect(screen.getByTestId("status-component")).toBeInTheDocument();
    expect(
      screen.queryByTestId("transcription-component")
    ).not.toBeInTheDocument();
  });
});
