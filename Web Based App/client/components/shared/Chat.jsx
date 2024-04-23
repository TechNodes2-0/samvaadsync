"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown'

const Chat = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newMessage = { type: 'query', text: query };
    setMessages([...messages, newMessage]);

    try {
      // const response = await axios.post('http://localhost:5000/getAnswer', {
              const response = await axios.post('http://localhost:5001/getAnswer', {
   
     query
      });
      const {data}=response;

      if (data.answer) {
        setMessages((prevMessages) => [...prevMessages, { type: 'answer', text: data.answer }]);
        setQuery('');
      } else {
        console.error('No answer received from the server');
      }
    } catch (error) {
      console.error('Failed to fetch the answer:', error);
    }
  };

  return (
    <div className="flex flex-col h-[500px] max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg mb-2 max-w-[75%] ${msg.type === 'query' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-gray-800'}`}>
            <p><Markdown>{msg.text}</Markdown></p>
          </div>
        ))}
      </div>
      <form className="flex p-4 bg-white border-t border-gray-300" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          className="flex-grow mr-4 p-2 rounded-full border border-gray-300"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-full">Send</button>
      </form>
    </div>
  );
};

export default Chat;
