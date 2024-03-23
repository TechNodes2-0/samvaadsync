// "use server";

// import { connectToDatabase } from "../database";
// import Message from "@/database/messages.model";
// import CryptoJS from "crypto-js";

// export default async function getAnswer(authorId, receiverId) {
//   try {
//     await connectToDatabase();

//     const messages = await Message.find({
//       author: authorId,
//       receiver: receiverId,
//     });
//     console.log(messages);

//     console.log("Populating messages...");
//     const populatedMessages = await Message.populate(messages, {
//       path: "author receiver",
//     });
//     const decryptedMessages = populatedMessages.map((message) => {
//       // const secretKey = message.receiver._id + message.author._id;
//       const secretKey = "9898114851";
//       console.log(
//         "secretKey",
//         message.receiver._id,
//         message.author._id,
//         secretKey
//       );

//       if (message.message) {
//         const decryptedData = CryptoJS.AES.decrypt(
//           message.message,
//           secretKey
//         ).toString(CryptoJS.enc.Utf8);

//         message.message = decryptedData;
//       }

//       return message;
//     });
//     const prompt = JSON.stringify(decryptedMessages);
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     console.log("Generating content...");
//     const templatePrompt = `${prompt}
//     Give Chat Summary point wise chat summary.`;

//     const result = await model.generateContent(templatePrompt);
//     console.log("Generated content:", result);

//     const response = await result.response;
//     const text = response.text();
//     console.log("Response text:", text);

//     return text;
//   } catch (error) {
//     console.error("Error Occurred:", error.message);
//   }
// }
