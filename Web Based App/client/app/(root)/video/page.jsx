// pages/index.js
"use client"
import MeetingButton from "@/components/shared/MeetingButton";
import { useRouter } from "next/navigation";  // Correcting the import statement
import React from "react";

export default function Home() {
  const router = useRouter();

  const handleInitiateMeeting = () => {
    console.log('Meeting started!');
    // Redirects to the video call page
    router.push("https://video-captions.onrender.com");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Meeting Features</h2>
        <div className="mb-6">
          <h3 className="text-xl font-bold">Live Translated Captions</h3>
          <p>
            During video meetings, our service provides live captions translated into the user's preferred language.
            This helps avoid misunderstandings and ensures all participants can follow the conversation accurately,
            enhancing the effectiveness of cross-language interactions.
          </p>
          <p className="mt-2">
            We utilize <strong>Vonage Audio Connector</strong> and <strong>Azure Speech-to-Text Translator</strong>
            services to ensure real-time accuracy and accessibility.
          </p>
        </div>
        <MeetingButton onInitiate={handleInitiateMeeting} />
      </div>
    </div>
  );
}
