import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Transcription, TranscriptionProps } from "./Transcription";

// mock the AudioPlayer component because this test is not concerned with the implementation of AudioPlayer
jest.mock("./AudioPlayer", () => ({
  AudioPlayer: jest.fn(({ audioUrl }: { audioUrl: string }) => (
    <div data-testid="audio-player" data-audio-url={audioUrl}>
      AudioPlayer
    </div>
  )),
}));

describe("Transcription Component", () => {
  const defaultProps: TranscriptionProps = {
    loading: false,
    transcription: "This is a test transcription.",
    audioUrl: "test-audio.mp3",
  };

  test("shows loading message when loading is true", () => {
    render(<Transcription {...defaultProps} loading={true} />);

    expect(screen.getByText("Uploading & transcribing...")).toBeInTheDocument();
    expect(screen.queryByTestId("audio-player")).not.toBeInTheDocument();
    expect(screen.queryByText("Transcription:")).not.toBeInTheDocument();
  });

  test("renders AudioPlayer and transcription when loading is false", () => {
    render(<Transcription {...defaultProps} />);

    const audioPlayer = screen.getByTestId("audio-player");
    expect(audioPlayer).toBeInTheDocument();
    expect(audioPlayer).toHaveAttribute("data-audio-url", "test-audio.mp3");

    expect(screen.getByText("Transcription:")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test transcription.")
    ).toBeInTheDocument();
  });

  test("passes the correct audioUrl to AudioPlayer", () => {
    render(<Transcription {...defaultProps} audioUrl="new-audio.mp3" />);

    const audioPlayer = screen.getByTestId("audio-player");
    expect(audioPlayer).toHaveAttribute("data-audio-url", "new-audio.mp3");
  });
});
