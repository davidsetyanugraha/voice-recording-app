import { AudioPlayer } from "./AudioPlayer";

export interface TranscriptionProps {
  loading: boolean;
  transcription: string;
  audioUrl: string;
}

export const Transcription = ({
  loading,
  transcription,
  audioUrl,
}: TranscriptionProps) => {
  return (
    <div className="flex-grow bg-gray-100 p-8 rounded">
      {loading ? (
        <p className="text-gray-600">Uploading & transcribing...</p>
      ) : (
        <>
          <AudioPlayer audioUrl={audioUrl} />
          <h3 className="font-bold">Transcription:</h3>
          <p>{transcription}</p>
        </>
      )}
    </div>
  );
};
