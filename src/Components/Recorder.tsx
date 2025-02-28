import { RECORDING_STATE } from "../Hook/UseMediaRecorder";

export interface RecorderProps {
  start: () => Promise<void>;
  stop: () => void;
  resume: () => void;
  pause: () => void;
  state: RecordingState;
}

export const Recorder = ({
  start,
  stop,
  resume,
  pause,
  state,
}: RecorderProps) => {
  return (
    <div className="flex space-x-4 justify-center sticky bottom-0 p-4 bg-white text-center">
      {state === RECORDING_STATE.INACTIVE && (
        <button
          onClick={() => {
            start().catch(console.error);
          }}
          className="bg-red-500 hover:bg-red-600 text-white p-4 w-32 rounded transition cursor-pointer"
        >
          Record
        </button>
      )}

      {state === RECORDING_STATE.PAUSED && (
        <div>
          <button
            onClick={resume}
            className="bg-green-500 hover:bg-green-600 text-white p-4 w-32 rounded transition cursor-pointer"
          >
            Resume
          </button>
        </div>
      )}

      {state === RECORDING_STATE.RECORDING && (
        <div>
          <button
            onClick={pause}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 w-32 rounded transition cursor-pointer"
          >
            Pause
          </button>
        </div>
      )}

      {state !== RECORDING_STATE.INACTIVE && (
        <div>
          <button
            onClick={stop}
            className="bg-red-500 hover:bg-red-600 text-white p-4 w-32 rounded transition cursor-pointer"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};
