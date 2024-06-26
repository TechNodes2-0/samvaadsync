import React from "react";

const SideBar = ({ onlineUsers, author, handleUserClick, generateSummary }) => {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={generateSummary}
      >
        Generate Summary
      </button>
      <div className="flex flex-col items-left bg-indigo-100 border border-gray-200 w-full py-6 px-4 rounded-lg">
        <div className="text-sm font-semibold">{author}</div>
        <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
          {onlineUsers &&
            onlineUsers
              .filter((user) => user.username !== author)
              .map((user) => (
                <button
                  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    H
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {user.username}
                  </div>
                </button>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
