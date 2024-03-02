"use client";
import { useUser } from "@/context/User.context";
import getFormattedDate from "@/utils/formatedCurrentDate";
import formatedTime from "@/utils/formatedTime";
import { useEffect, useState } from "react";
import Spinner from "../loading";
import parseChat from "@/utils/parseChat";

const ChatSummary = ({ chat }) => {
  console.log("Rendering ChatSummary component with chat:", chat);

  const { picture } = useUser();
  const currentDate = getFormattedDate();
  const currentTime = formatedTime();
  const RecuriterName = "Vikram Mahante";
  const ClientName = "Rahul Sharma";
  const { openai } = useUser();
  const [summaryType, setSummaryType] = useState("bullet");
  const [loading, setLoading] = useState(false);
  const [bulletSummary, setBulletSummary] = useState([]);
  const [paragraphSummary, setParagraphSummary] = useState("");
  const [extractedDetails, setExtractedDetails] = useState({});
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (chat) {
        const result = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-0125",
          messages: [
            {
              role: "system",
              content:
                "You are a chat summarizer designed to extract key information from conversations. Please summarize the following chat between a recruiter and a potential candidate for a job role. Extract details such as the client's name, experience, location, availability, visa status, skills, and whether they can relocate. Additionally, include snippets of the chat content to provide context. If any information is not found, please indicate it as N/A!",
            },
            {
              role: "user",
              content: chat,
            },
            {
              role: "system",
              content: `Summarize the key details about the client in two formats - first, provide a bullet-point summary, and second, create a paragraph summarizing the chat between the recruiter and the client. Include snippets of the chat content to provide context. In addition to the summary, extract details including the client's name, experience, location, availability, visa status, skills, and whether they can relocate. If any of this information is not available in the chat, indicate it as N/A. Follow the template provided below between ###.The response should come in this regex form
            for Extracted details:  /Client Name: (.+?)\nExperience: (.+?)\nLocation: (.+?)\nAvailability: (.+?)\nVisa Status: (.+?)\nSkills: (.+?)\nRelocation: (.+?)\n/; and for paragraphRegex = /Paragraph Summary:\n(.+?)\n\nBullet-point Summary:\n(.+)/s;
          
            ###
          
            Extracted details:
            Client Name: [Client's Name]
            Experience: [Years of Experience]
            Location: [Current Location]
            Availability: [Availability for Work]
            Visa Status: [Current Visa Status]
            Skills: [List of Key Skills]
            Relocation: [Can Relocate - Yes/No]
          
            Paragraph Summary:
            [Paragraph summarizing the chat between the recruiter and the client.]
          
            Bullet-point Summary:
            [Bullet-point summary of the chat between the recruiter and the client.]
            ###
          
            Example Chat Summary:
            
            ###
          
            Bullet-point Summary:
            - Conversation focuses on the importance of small talk in building trust and rapport
            - Speaker 1 initially shows annoyance with small talk
            - Speaker 3 explains the significance of small talk
            - Both speakers agree on the necessity of small talk for meaningful conversation
            - Speaker 1 uses a metaphor to emphasize the role of small talk in building connections
            - Both speakers appreciate the conversation they are having
          
            Paragraph Summary:
            The conversation revolves around the importance of small talk and how it helps in building trust and rapport with others. Speaker 1 initially expresses annoyance with small talk, but Speaker 3 explains its significance, and they both agree that it is necessary to engage in small talk to have a more meaningful conversation. Speaker 1 uses a metaphor to explain the importance of small talk in building a connection with someone, and they both appreciate the conversation they are having.
            ###
            `,
            },
          ],
        });
        console.log("API Response:", result.choices[0].message.content);
        const apiResponse = parseChat(result.choices[0].message.content);
        setBulletSummary(apiResponse.BulletSummary);
        setParagraphSummary(apiResponse.ParagraphSummary);
        setExtractedDetails(apiResponse.ExtractedDetails);

        console.log(
          "Non Parsed API Response:",
          result.choices[0].message.content
        );
        console.log(
          "Parsed API Response:",
          parseChat(result.choices[0].message.content)
        );
        console.log("Parsed API Response:", apiResponse);
      } else {
        throw new Error("Chat is empty");
      }
    } catch (e) {
      alert("Something is going wrong, Please try again.");
      setBulletSummary([]);
      setParagraphSummary("");
      setExtractedDetails({});
      console.error("Error in API request:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSubmit();
  }, [chat]);

  const bulletList = (
    <ul className="mt-4 list-disc space-y-2 pl-5">
      {Object.entries(bulletSummary).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}</li>
      ))}
    </ul>
  );

  const paragraph = <p className="mt-4">{paragraphSummary}</p>;

  console.log("Rendering ChatSummary component complete.");
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              {currentDate}
            </div>
            <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              {currentTime}
            </div>

            <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              Summary of Chat of {RecuriterName} with {ClientName}
            </div>
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                alt="recuriter Profile Photo"
                src={picture || ""}
              />
            </span>
          </div>
          <div className="mt-6">
            <div dir="ltr" data-orientation="horizontal">
              <div className="flex space-x-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-blue-600">
                  Summary
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Chat History
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4">
            <div className="col-span-2">
              <div className="flex flex-col">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Summary
                </button>
                {extractedDetails ? (
                  Object.entries(extractedDetails).map(([key, value]) => (
                    <div className="inline-flex items-center justify-start whitespace-break-spaces rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-lg text-slate-500 ">
                      <span className="mr-2 text-blue-600 text-lg whitespace-nowrap">
                        {key} =&gt;
                      </span>
                      {value}
                    </div>
                  ))
                ) : (
                  <div>N/A</div>
                )}
              </div>
            </div>
            <div className="col-span-2 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Summary</h3>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setSummaryType("bullet")}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border ${
                    summaryType === "bullet"
                      ? "bg-background text-blue-600"
                      : "bg-accent hover:bg-accent"
                  } hover:text-accent-foreground h-10 px-4 py-2 text-blue-600`}
                >
                  Bullet List
                </button>
                <button
                  onClick={() => setSummaryType("paragraph")}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border ${
                    summaryType === "paragraph"
                      ? "bg-background text-blue-600"
                      : "bg-accent hover:bg-accent"
                  } hover:text-accent-foreground h-10 px-4 py-2`}
                >
                  Paragraph
                </button>
              </div>

              {summaryType === "bullet" ? bulletList : paragraph}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSummary;
