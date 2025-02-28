import { RECORDING_STATE } from "../Hook/UseMediaRecorder";

export const Status = ({
  state,
  audioUrl,
}: {
  state: RecordingState;
  audioUrl: string;
}) => {
  const statusMessage = () => {
    if (state === RECORDING_STATE.PAUSED) {
      return "Press resume button to continue recording or stop button to end recording...";
    } else if (state === RECORDING_STATE.RECORDING) {
      return "Recording in progress...";
    } else if (audioUrl) {
      return "Converting voice to transcript...";
    }
    return "Press record button below to start recording...";
  };

  return (
    <div className="flex-grow bg-gray-100 p-8 rounded text-justify">
      <p className="text-gray-600">{statusMessage()}</p>
    </div>
  );
};
