"use client"
import React from 'react'
import Chat from '../../../components/shared/Chat'
import FileUpload from '../../../components/shared/FileUpload'
import{ useState,useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import PdfPreviewUpload from '@/components/shared/PDFViewer'
import axios from 'axios'
import { set } from 'mongoose'
const page = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const[    questions,setQuestions]=useState()
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
const[previewUrl,setPreviewUrl]=useState('')
  // Handle file selection
  const handleFileChange = (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
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
  setQuestions(question);
  // saveQuestionsToLocalStorage(question);
}

       
      } catch (error) {
        console.error('Error uploading files:', error);
        setMessage('Error uploading files. Please try again.');
      }
    } else {
      setMessage('Please select files to upload.');
    }
  };
    // const[questions,setQuestions]=useState();
  // const loadQuestionsFromLocalStorage = () => {
  //   // Retrieve the serialized question data from localStorage
  //   const serializedQuestion = localStorage.getItem('questions');
    
  //   // Check if there is any data retrieved
  //   if (serializedQuestion !== null) {
  //     // Parse the serialized data back into its original form
  //   //   const question = JSON.parse(serializedQuestion);
      
  //     // Use the retrieved data as needed, for example, updating component state
  //     setQuestions(serializedQuestion);
  //   }
  // };
  //   useEffect(() => {
  //       loadQuestionsFromLocalStorage();
  //     }, []); // Empty dependency array means this effect runs once on mount
      useEffect(() => {
        console.log(selectedFiles);
      }, [selectedFiles]);    
  return (
    <div>
      {/* <FileUpload />
        <Chat/> */}

      <div className="flex h-screen bg-gray-100">
        <aside className="w-1/4 bg-white p-6">
          <div className="flex justify-between items-center mb-6">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
              + New Chat
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600"
            >
              <circle cx={12} cy={12} r={10} />
              <path d="M17 12h.01" />
              <path d="M12 12h.01" />
              <path d="M7 12h.01" />
            </svg>
          </div>
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
          {/* <FileUpload/> */}
          <div className="flex items-center justify-between mb-6">
            {/* <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
              Upgrade to Plus
            </button> */}
            {/* <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-gray-200">
              New Folder
            </button> */}
          </div>
          <div className="space-y-2">
            <div className="bg-blue-500 text-white p-2 rounded-md">
              Jayesh Yadav (3).pdf
            </div>
           
          </div>
          <div className="absolute bottom-0 left-0 p-6 w-1/4">
            {/* <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-gray-200 w-full mb-2">
              Sign in to save your chat history
            </button> */}
            {/* <div className="flex justify-between text-xs text-gray-500">
              <span>Home</span>
              <span>Account</span>
              <span>API</span>
              <span>FAQ</span>
              <span>Feedback</span>
            </div> */}
          </div>
        </aside>
        <main className="w-3/4 flex">
          <div className="w-1/2 bg-white p-6 overflow-auto">
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">JAYESH YADAV</h1>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect width={12} height={8} x={6} y={14} />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1={12} x2={12} y1={15} y2={3} />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1={12} x2={12} y1={2} y2={15} />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="M17 12h.01" />
                  <path d="M12 12h.01" />
                  <path d="M7 12h.01" />
                </svg>
              </div>
            </header>

            <section className='mb-6 '>
          
{previewUrl && <PdfPreviewUpload  previewUrl={previewUrl}/>}
            </section>
            {/* <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">SUMMARY</h2>
              <p className="text-sm">
                Experienced MERN Stack Developer with a strong foundation in
                Node.js, Express.js, React.js, and Next.js. Proven ability to
                thrive in fast-paced environments, demonstrated by winning
                multiple hackathons and crafting innovative solutions using
                various APIs. A dedicated learner with a track record of
                delivering dynamic web applications and continuously adapting to
                evolving technologies.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">EDUCATION</h2>
              <p className="text-sm">
                Don Bosco High School, Vadodara
                <br />
                Completed Higher Secondary Education
                <br />
                2019 - 2020
              </p>
              <p className="text-sm mt-4">
                Drs. Kiran and Pallavi Global University
                <br />
                Pursuing BTech in Computer Science
                <br />
                2021 - 2025
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">SKILLS</h2>
              <ul className="text-sm list-disc ml-5">
                <li>
                  Proficient in building full-stack web applications using the
                  MERN stack.
                </li>
                <li>Skilled in creating RESTful APIs and server-side logic.</li>
                <li>
                  Strong understanding of JavaScript, including ES6+ features.
                </li>
                <li>
                  Proficient in C++ for implementing data structures and
                  algorithms.
                </li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">PROJECTS</h2>
              <h3 className="text-sm font-semibold mt-4">
                Transparent Ecommerce website
              </h3>
              <p className="text-sm">
                Developed an innovative online grocery platform focusing on
                health and budget, enhancing user experience with intuitive
                search, filters, and pagination.
              </p>
              <h3 className="text-sm font-semibold mt-4">SaamvadSync</h3>
              <p className="text-sm">
                Developed SaamvadSync, a cutting-edge global recruitment
                platform, enhancing cross-language interactions with integrated
                live translation capabilities for real-time multilingual resume
                and VoIP calls.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">ACHIEVEMENTS</h2>
              <ul className="text-sm list-disc ml-5">
                <li>Won Best Prize at MLH Hackathon named "ChatHacks".</li>
                <li>Won First Use of Vonage APIs at HackTheFall.</li>
                <li>2nd Runner Up in SIH Internal Hackathon.</li>
              </ul>
            </section> */}
          </div>
          <div className="w-1/2 bg-white p-6">
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Chat</h1>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect width={12} height={8} x={6} y={14} />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1={12} x2={12} y1={15} y2={3} />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1={12} x2={12} y1={2} y2={15} />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="M17 12h.01" />
                  <path d="M12 12h.01" />
                  <path d="M7 12h.01" />
                </svg>
              </div>
            </header>
            {/* <div className="space-y-4 mb-6">
              <p className="text-sm">
                Hello and welcome to my PDF file! I am Jayesh Yadav, a MERN
                Stack Developer with a passion for crafting innovative solutions
                and delivering dynamic web applications. In this document, you
                will find information about my projects, education, and skills.
                Feel free to reach out if you have any questions or would like
                to discuss potential collaborations.
              </p>
              <ul className="text-sm list-disc ml-5">
                <li>
                  Can you provide more details about the online grocery platform
                  you developed, including the technologies used and the impact
                  it had on users?
                </li>
                <li>
                  How do you approach problem-solving in your development work,
                  and can you give an example of a challenging issue you
                  successfully resolved?
                </li>
                <li>
                  What are your future career goals and how do you plan to
                  continue learning and growing as a MERN Stack Developer?
                </li>
              </ul>
            </div> */}
          {questions &&  <ReactMarkdown>{questions}</ReactMarkdown>}
            <Chat/>
            {/* <div className="flex items-center justify-between">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Ask any question..."
              />
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
                &gt;
              </button>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default page