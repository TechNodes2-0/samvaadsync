"use server";

import { connectToDatabase } from "../database";
import Message from "@/database/messages.model";
import { revalidatePath } from "next/cache";

export const getMessages = async (authorId) => {
  console.log("Getting Message", authorId);
  try {
    await connectToDatabase();
    const messages = await Message.find({
      $or: [{ "author._id": authorId }, { "receiver._id": authorId }],
    });
    const populatedMessages = await Message.populate(messages, {
      path: "author receiver",
    });
    return JSON.parse(JSON.stringify(populatedMessages));
  } catch (error) {
    console.log("Error getting messages", error);
  }
};
