"use client";
import React, { useEffect, useState } from "react";
import { MonsterApiClient } from "monsterapi";
import Image from "next/image";

const ImageGenerator = () => {
  const [generatedContent, setGeneratedContent] = useState(null);
  const apiKey =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjljMDQ1ZGM5MDI0OWQyN2NkMjNlN2NjZGE4NDE1NmViIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMTBUMDU6MzI6MjEuNTQyMzkyIn0.yKCBK4dZLYm4Qpev3PrEQy1HTJdowY1EHbQK70yoBvY";
  const model = "txt2img";

  useEffect(() => {
    const client = new MonsterApiClient(apiKey);

    const input = {
      prompt:
        "detailed sketch of lion by greg rutkowski, beautiful, intricate, ultra realistic, elegant, art by artgerm",
      negprompt: "deformed, bad anatomy, disfigured, poorly drawn face",
      samples: 2,
      steps: 50,
      aspect_ratio: "square",
      guidance_scale: 7.5,
      seed: 2414,
      style: "photographic",
    };

    client
      .generate(model, input)
      .then((response) => {
        // Handle the response from the API
        console.log("Generated content:", response);
        setGeneratedContent(response);
      })
      .catch((error) => {
        // Handle API errors
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {generatedContent && (
        <Image
          src={generatedContent}
          alt="Generated Image"
          width={500} // Adjust the width as needed
          height={500} // Adjust the height as needed
        />
      )}
    </div>
  );
};

export default ImageGenerator;
