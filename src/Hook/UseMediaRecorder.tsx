import { useState, useRef } from "react";

export const enum RECORDING_STATE {
  INACTIVE = "inactive",
  PAUSED = "paused",
  RECORDING = "recording",
}

export const initRecorder = (
  mediaStream: MediaStream,
  audioChunksRef: React.RefObject<Blob[]>
): MediaRecorder => {
  const recorder = new MediaRecorder(mediaStream, { mimeType: "audio/webm" });

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) audioChunksRef.current.push(event.data);
  };

  return recorder;
};

export const cleanMediaStream = (
  mediaStreamRef: React.RefObject<MediaStream | null>
) => {
  mediaStreamRef.current?.getTracks().forEach((track) => {
    track.stop();
  });
  mediaStreamRef.current = null;
};

export const useMediaRecorder = (
  convertAudioToText: (audioBlob: Blob) => Promise<void>,
  setTranscription: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const [recordingState, setRecordingState] = useState<RecordingState>(
    RECORDING_STATE.INACTIVE
  );
  const [audioUrl, setAudioUrl] = useState<string>("");

  // useRef is used because we do not need to re-render MediaRecorder, MediaStream, and Blob.
  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const mediaStreamRef = useRef<MediaStream>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const resetRecorder = () => {
    setTranscription(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  const startRecording = async () => {
    try {
      resetRecorder();

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaStreamRef.current = mediaStream;
      audioChunksRef.current = [];

      const recorder = initRecorder(mediaStream, audioChunksRef);
      recorder.onstop = onstop;

      mediaRecorderRef.current = recorder;

      recorder.start();
      setRecordingState(RECORDING_STATE.RECORDING);
    } catch (error) {
      console.error("Recording error:", error);
    }
  };

  const pause = () => {
    if (
      mediaRecorderRef.current &&
      recordingState === RECORDING_STATE.RECORDING
    ) {
      mediaRecorderRef.current.pause();
      setRecordingState(RECORDING_STATE.PAUSED);
    }
  };

  const resume = () => {
    if (mediaRecorderRef.current && recordingState === RECORDING_STATE.PAUSED) {
      mediaRecorderRef.current.resume();
      setRecordingState(RECORDING_STATE.RECORDING);
    }
  };

  const onstop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, {
      type: "audio/webm",
    });
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);

    cleanMediaStream(mediaStreamRef);
    await convertAudioToText(audioBlob);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecordingState(RECORDING_STATE.INACTIVE);
    }
  };

  return {
    startRecording,
    stopRecording,
    resume,
    pause,
    stop,
    recordingState,
    audioUrl,
  };
};
