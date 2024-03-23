"use server";

import { connectToDatabase } from "../database";
import Message from "@/database/messages.model";
import { revalidatePath } from "next/cache";
import CryptoJS from "crypto-js";

export const getMessages = async (authorId) => {
  try {
    await connectToDatabase();
    const messages = await Message.find({
      $or: [{ "author._id": authorId }, { "receiver._id": authorId }],
    });
    const populatedMessages = await Message.populate(messages, {
      path: "author receiver",
    });

    const decryptedMessages = populatedMessages.map((message) => {
      // const secretKey = message.receiver._id + message.author._id;
      const secretKey = "9898114851";

      if (message.message) {
        const decryptedData = CryptoJS.AES.decrypt(
          message.message,
          secretKey
        ).toString(CryptoJS.enc.Utf8);

        message.message = decryptedData;
      }

      return message;
    });
    return JSON.parse(JSON.stringify(decryptedMessages));
  } catch (error) {
    console.log("Error getting messages", error);
  }
};
