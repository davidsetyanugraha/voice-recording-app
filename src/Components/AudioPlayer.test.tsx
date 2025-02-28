import { render, screen } from "@testing-library/react";
import { AudioPlayer } from "./AudioPlayer";

test("it should render audio player", () => {
  render(<AudioPlayer audioUrl="test" />);

  expect(screen.getByTestId("audio-component")).toBeInTheDocument();
});
