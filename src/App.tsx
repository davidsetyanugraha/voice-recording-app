import { Recorder } from "./Components/Recorder";
import { useMediaRecorder } from "./Hook/UseMediaRecorder";
import { useSpeechToText } from "./Hook/UseSpeechToText";
import { Board } from "./Components/Board";

const App = () => {
  const { isUploading, transcription, setTranscription, convertAudioToText } =
    useSpeechToText();

  const {
    pause,
    resume,
    startRecording,
    stopRecording,
    recordingState,
    audioUrl,
  } = useMediaRecorder(convertAudioToText, setTranscription);

  return (
    <div className="flex flex-col h-screen mx-auto space-y-4 lg:w-3/4 overflow-x-hidden">
      <h1 className="text-2xl w-full m-4">Voice recorder</h1>

      <Board
        state={recordingState}
        loading={isUploading}
        transcription={transcription}
        audioUrl={audioUrl}
      />

      <Recorder
        pause={pause}
        resume={resume}
        start={startRecording}
        stop={stopRecording}
        state={recordingState}
      />
    </div>
  );
};

export default App;
