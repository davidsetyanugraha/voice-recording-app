export const AudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  return (
    <div className="mx-auto w-full text-2xl md:w-3/4 text-center">
      Your last recording:
      <audio
        controls
        src={audioUrl}
        className="w-full mt-4 accent-red-500"
        data-testid="audio-component"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};
