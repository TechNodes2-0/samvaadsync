import React from "react";

const YourMessage = ({
  messageContent = "Hey How are you today?",
  index = 1,
  timestamp = new Date().toLocaleTimeString(),
  username = "Anonymous",
}) => {
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {firstLetter}
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{messageContent}</div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>{username}</span>
            {/* <span>{formatTimestamp(timestamp)}</span> */}
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourMessage;
