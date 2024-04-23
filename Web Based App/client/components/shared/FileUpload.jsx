"use client";
import React, { useState } from 'react';
import axios from 'axios';

// Import the function for chunking PDF docs
 // Adjust the path as necessary

const FileUpload = () => {
  // State to store the selected files
  const [selectedFiles, setSelectedFiles] = useState([]);
  const[    questions,setQuestions]=useState([])
  const saveQuestionsToLocalStorage = (question) => {
    // // Serialize question data to a string
    // const serializedQuestion = JSON.stringify(question);
    
    // Save serialized data to localStorage
    localStorage.setItem('questions', question);
    
    // Update state or perform other actions as necessary
    setQuestions(question);
  };
  // State to store feedback messages
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files)); // Convert FileList to array
    setMessage(''); // Reset message
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      
      // Append each file to the form data
      selectedFiles.forEach((file) => {
        formData.append('PDFdocs', file);
      });
      
      try {
        // Make a POST request to your server endpoint
        const response = await axios.post('http://localhost:5001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // Handle response
        console.log(response.data);

if(response.data){
  const {question}=response.data;
  console.log('File uploaded successfully');
  setMessage('Files uploaded successfully Now you can start Chatting.');
  setSelectedFiles([]); // Clear file selection
  saveQuestionsToLocalStorage(question);
}

       
      } catch (error) {
        console.error('Error uploading files:', error);
        setMessage('Error uploading files. Please try again.');
      }
    } else {
      setMessage('Please select files to upload.');
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Your Resume</h2>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        className="mb-2 p-2 border border-gray-300 rounded-md"
        accept=".pdf" // Specify that only PDF files are accepted
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload 
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default FileUpload;
