const Message = require("../model/Message");
const User = require("../model/User");

const addMessage = async (author, receiver, message) => {
  try {
    const messageData = new Message({
      author,
      receiver,
      message,
    });

    const newMessage = await messageData.save();
    const populatedMessage = await newMessage.populate("author receiver");
    console.log("populatedMessage", populatedMessage);
    return {
      success: true,
      message: "Message sent successfully.",
      data: populatedMessage,
    };
  } catch (error) {
    console.log("error", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = { addMessage };
