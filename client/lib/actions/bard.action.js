"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDatabase } from "../database";
import Message from "@/database/messages.model";
import User from "@/database/user.model";
import CryptoJS from "crypto-js";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GIMINI_API_KEY
);

export default async function getAnswer(authorId, receiverId) {
  try {
    console.log(authorId, receiverId);
    console.log("Connecting to the database...");
    await connectToDatabase();

    console.log("Fetching messages...");
    const messages = await Message.find({
      author: authorId,
      receiver: receiverId,
    });
    console.log(messages);

    console.log("Populating messages...");
    const populatedMessages = await Message.populate(messages, {
      path: "author receiver",
    });
    const decryptedMessages = populatedMessages.map((message) => {
      // const secretKey = message.receiver._id + message.author._id;
      const secretKey = "9898114851";
      console.log(
        "secretKey",
        message.receiver._id,
        message.author._id,
        secretKey
      );

      if (message.message) {
        const decryptedData = CryptoJS.AES.decrypt(
          message.message,
          secretKey
        ).toString(CryptoJS.enc.Utf8);

        message.message = decryptedData;
      }

      return message;
    });
    const prompt = JSON.stringify(decryptedMessages);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    console.log("Generating content...");
    const templatePrompt = `${prompt}
    Give Chat Summary point wise chat summary.`;

    const result = await model.generateContent(templatePrompt);
    console.log("Generated content:", result);

    const response = await result.response;
    const text = response.text();
    console.log("Response text:", text);

    return text;
  } catch (error) {
    console.error("Error Occurred:", error.message);
  }
}
