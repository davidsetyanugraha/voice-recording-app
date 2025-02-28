import { useState } from "react";

export interface TranscriptionResponse {
  text?: string;
  error?: { message: string };
}

const sendAudioToAPI = async (
  formData: FormData | null
): Promise<TranscriptionResponse> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) return { error: { message: "No API key provided" } };
  if (!formData) return { error: { message: "No form data provided" } };

  try {
    const response: Response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      const errorData = (await response.json()) as TranscriptionResponse;
      throw new Error(errorData.error?.message ?? "Unknown API error");
    }

    return (await response.json()) as TranscriptionResponse;
  } catch (error) {
    return {
      error: {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
    };
  }
};

export const useSpeechToText = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);

  const convertAudioToText = async (audioBlob: Blob) => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");
    formData.append("model", "whisper-1");

    const data = await sendAudioToAPI(formData);

    setTranscription(
      data.text ??
        `Oops! We encountered an issue in producing transcription. Please try again in a moment. Error: ${
          data.error?.message ?? "Unknown error"
        }.`
    );

    setIsUploading(false);
  };

  return {
    isUploading,
    transcription,
    setTranscription,
    convertAudioToText,
  };
};
