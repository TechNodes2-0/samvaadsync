"use client";

import { currentUser, useAuth } from "@clerk/nextjs";
import ReceivedMessage from "./components/ReceivedMessage";
import SideBar from "./components/SideBar";
import YourMessage from "./components/YourMessage";
import { getUserById } from "@/lib/actions/user.action";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
function page() {
  const [user, setUser] = useState(null); // Set initial state to null
  const [dataBaseMessages, setDataBaseMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [file, setFile] = useState(null); // Set initial state to null
  const [selectedLang, setSelectedLang] = useState("en");
  const [receiver, setReceiver] = useState(null);
  const { userId } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState(null);
  const socketRef = useRef();

  const handleUserClick = (clickedUserId) => {
    setReceiver(clickedUserId);
  };

  const clearReceiverSocketId = () => {
    setReceiver(null);
  };

  const sendMessage = async () => {
    console.log("sending message");
    if (currentMessage.trim() === "" || !receiver || !user || !userId) return;
    if (file) {
      // ... (unchanged code for file handling)
    } else {
      const messageData = {
        receiver: {
          username: receiver?.username,
          socketId: receiver?.socketId || "",
          _id: receiver?.userId,
        },
        author: {
          username: user?.username,
          socketId: socketRef.current.id || "",
          _id: user?._id,
        },
        message: currentMessage,
        type: "text",
        timestamp: new Date().toISOString(),
      };

      let translatedMessageData = { ...messageData };

      if (selectedLang !== "en") {
        const translatedText = await translateText(
          currentMessage,
          selectedLang,
          "en"
        );
        translatedMessageData.message = translatedText?.translatedText;
      }

      socketRef.current.emit("send_message", translatedMessageData, (cb) => {
        const updatedMessageList = [
          ...messageList,
          {
            ...messageData,
            author: { username: user.username, _id: user._id },
            receiver: { _id: receiver.userId, username: receiver.username },
            playerId: cb.playerId,
          },
        ];
        setMessageList(updatedMessageList);
      });

      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserById(userId);
      setUser(fetchedUser);
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.emit("new-user-add", user?._id, user?.username);
    socketRef.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const handleReceiveMessage = async (data) => {
      console.log("Message Recieved", data);
      if (data.type === "text" && selectedLang !== "en") {
        const translatedText = await translateText(
          data.message,
          "en",
          selectedLang
        );
        data.message = translatedText?.translatedText;
      }
      setMessageList((prevData) => [...prevData, data]);
    };
    socketRef.current.on("receive_message", handleReceiveMessage);

    return () => {
      socketRef.current.off("receive_message", handleReceiveMessage);
    };
  }, [selectedLang, socketRef.current]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBar
          onlineUsers={onlineUsers}
          author={user?.username}
          handleUserClick={handleUserClick}
        />
        <div className="flex flex-col flex-auto h-full p-6">
          {receiver ? (
            <ChatInterface
              messageList={messageList.filter(
                (messageList) =>
                  messageList.author.username === receiver.username ||
                  messageList.receiver.username === receiver.username
              )}
              currentMessage={currentMessage}
              setCurrentMessage={setCurrentMessage}
              sendMessage={sendMessage}
              clearReceiverSocketId={clearReceiverSocketId}
              user={user}
            />
          ) : (
            <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4 bg-gray-100 rounded-2xl w-screen">
              Select User
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const ChatInterface = ({
  messageList,
  currentMessage,
  setCurrentMessage,
  sendMessage,
  clearReceiverSocketId,
  user,
}) => (
  <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4 bg-gray-100 rounded-2xl">
    <div className="flex flex-col h-full mb-4 overflow-x-auto">
      <div className="flex flex-col h-full">
        {messageList.map((message, index) =>
          message.author._id === user?._id ? (
            <YourMessage
              index={index}
              messageContent={message?.message}
              username={user?.username}
              timestamp={message?.timestamp}
            />
          ) : (
            <ReceivedMessage
              index={index}
              messageContent={message?.message}
              username={message?.author.username}
              timestamp={message?.timestamp}
            />
          )
        )}
      </div>
    </div>
    <div className="flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl">
      <div>
        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyPress={(event) => event.key === "Enter" && sendMessage()}
          />
          <button className="absolute top-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="ml-4">
        <button
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-3 flex-shrink-0 cursor-pointer"
          onClick={sendMessage}
        >
          <svg
            className="w-4 h-4 -mt-px transform rotate-45"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </button>
      </div>
      <div className="ml-4">
        <button
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-xl text-white px-4 py-3 flex-shrink-0 cursor-pointer"
          onClick={clearReceiverSocketId}
        >
          <svg
            className="w-4 h-4 -mt-px transform rotate-45"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
);

export default page;
