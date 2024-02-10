"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDatabase } from "../database";
import Message from "@/database/messages.model";
import User from "@/database/user.model";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GIMINI_API_KEY
);

export default async function getAnswer(
  authorId = "65c507fe05fe0953fc2c2195",
  receiverId = "65c5086b05fe0953fc2c2197"
) {
  try {
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
    const prompt = JSON.stringify(populatedMessages);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    console.log("Generating content...");
    const templatePrompt = `${prompt}
    Give Chat Summary point wise and show use user's data and user's username in the chat summary.`;

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
