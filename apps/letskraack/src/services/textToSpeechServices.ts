import { PollyClient, SynthesizeSpeechCommand, VoiceId } from "@aws-sdk/client-polly";

const textToSpeechServices = async (
  text: string,
  expertName: VoiceId // strictly typed voice ID
): Promise<string> => {
  console.log("Text to Speech - Input:", text);
  console.log("Expert Voice:", expertName);

  if (!text || !expertName) {
    throw new Error("Text or Expert Name is missing");
  }

  const pollyClient = new PollyClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
  });

  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: "mp3",
    VoiceId: expertName,
  });

  try {
    const { AudioStream } = await pollyClient.send(command);

    if (!AudioStream) {
      throw new Error("No AudioStream received from AWS Polly");
    }

    console.log("AudioStream received successfully");

    // Convert stream to Uint8Array
    const audioBytes = new Uint8Array(await AudioStream.transformToByteArray());

    // Create blob directly from Uint8Array
    const audioBlob = new Blob([audioBytes], { type: "audio/mp3" });

    // Convert blob to URL for playback
    const audioUrl = URL.createObjectURL(audioBlob);

    console.log("Audio URL created successfully");

    return audioUrl;
  } catch (error) {
    console.error("Error in textToSpeechServices:", error);
    throw error;
  }
};

export default textToSpeechServices;
