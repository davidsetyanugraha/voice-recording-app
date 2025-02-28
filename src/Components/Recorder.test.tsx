import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Recorder } from "./Recorder";
import { RECORDING_STATE } from "./../Hook/UseMediaRecorder";

describe("Recorder Component", () => {
  let mockStart: jest.Mock;
  let mockStop: jest.Mock;
  let mockResume: jest.Mock;
  let mockPause: jest.Mock;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    mockStart = jest.fn().mockResolvedValue(undefined);
    mockStop = jest.fn();
    mockResume = jest.fn();
    mockPause = jest.fn();
    user = userEvent.setup();
  });

  const renderRecorder = (state: RecordingState) => {
    render(
      <Recorder
        start={mockStart}
        stop={mockStop}
        resume={mockResume}
        pause={mockPause}
        state={state}
      />
    );
  };

  test("renders Record button when state is INACTIVE and triggers start on click", async () => {
    renderRecorder(RECORDING_STATE.INACTIVE);

    const recordButton = screen.getByText("Record");
    expect(recordButton).toBeInTheDocument();

    await user.click(recordButton);
    expect(mockStart).toHaveBeenCalledTimes(1);
  });

  test("renders Resume and Stop buttons when state is PAUSED", async () => {
    renderRecorder(RECORDING_STATE.PAUSED);

    const resumeButton = screen.getByText("Resume");
    const stopButton = screen.getByText("Stop");

    expect(resumeButton).toBeInTheDocument();
    expect(stopButton).toBeInTheDocument();

    await user.click(resumeButton);
    expect(mockResume).toHaveBeenCalledTimes(1);

    await user.click(stopButton);
    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  test("renders Pause and Stop buttons when state is RECORDING", async () => {
    renderRecorder(RECORDING_STATE.RECORDING);

    const pauseButton = screen.getByText("Pause");
    const stopButton = screen.getByText("Stop");

    expect(pauseButton).toBeInTheDocument();
    expect(stopButton).toBeInTheDocument();

    await user.click(pauseButton);
    expect(mockPause).toHaveBeenCalledTimes(1);

    await user.click(stopButton);
    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  test("does not render Record button when state is RECORDING or PAUSED", () => {
    renderRecorder(RECORDING_STATE.RECORDING);
    expect(screen.queryByText("Record")).not.toBeInTheDocument();

    renderRecorder(RECORDING_STATE.PAUSED);
    expect(screen.queryByText("Record")).not.toBeInTheDocument();
  });
});
