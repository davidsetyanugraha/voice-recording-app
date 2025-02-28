import { RECORDING_STATE } from "../Hook/UseMediaRecorder";
import { Status } from "./Status";
import { Transcription } from "./Transcription";

export interface BoardProps {
  state: RecordingState;
  loading: boolean;
  transcription: string | null;
  audioUrl: string;
}

export const Board = ({
  state,
  loading,
  transcription,
  audioUrl,
}: BoardProps) => (
  <>
    {state === RECORDING_STATE.INACTIVE && transcription && (
      <Transcription
        audioUrl={audioUrl}
        loading={loading}
        transcription={transcription}
      />
    )}

    {!transcription && <Status state={state} audioUrl={audioUrl} />}
  </>
);
