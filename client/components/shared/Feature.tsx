import React from "react";

const features = [
  {
    title: "Chat with Resume",
    description:
      "Recruiters can engage in conversations with candidates while accessing their resumes in real-time, allowing for detailed discussions about qualifications and experiences without switching between applications.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 6v2" />
        <path d="M11 6v2" />
        <path d="M15 6v2" />
        <path d="M7 14v2" />
        <path d="M11 14v2" />
        <path d="M15 14v2" />
        <path d="M17 20l4 -4l-4 -4" />
      </svg>
    ),
  },
  {
    title: "Integrated ATS Database",
    description:
      "Our advanced parsing model extracts key details from resumes, chats, and video transcriptions, integrating them seamlessly into the ATS database. This enhances data quality and streamlines the recruitment process.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
        <path d="M4 6v6c0 1.657 3.134 3 7 3s7 -1.343 7 -3V6" />
        <ellipse cx="12" cy="18" rx="8" ry="3"></ellipse>
        <path d="M4 18v6c0 1.657 3.134 3 7 3s7 -1.343 7 -3v-6" />
      </svg>
    ),
  },
  {
    title: "Smart Candidate Search with Similarity Search",
    description:
      "Leverage Vector Embedding for smarter candidate searches beyond keyword matching. Our system understands the context, ensuring you find candidates with relevant skills like React, MERN Stack, and Next.js.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
        <path d="M7 10a3 3 0 0 1 3 -3" />
        <path d="M10 7a3 3 0 0 1 3 3" />
      </svg>
    ),
  },
];

export default function Feature() {
  return (
    <div className="dark:bg-black bg-white">
      <section
        id="features"
        className="relative block px-6 py-10 md:py-20 md:px-10 dark:bg-neutral-900/30 bg-white"
      >
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="dark:text-gray-400 text-black my-3 flex items-center justify-center font-medium uppercase tracking-wider">
            Revolutionizing Recruitment
          </span>
          <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
            AI-Driven Solutions for Modern Hiring
          </h2>
          <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide dark:text-gray-400 text-black">
            Experience the future of recruitment with our cutting-edge
            technology designed to streamline your hiring process.
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-md dark:bg-neutral-900/50 bg-white p-8 text-center shadow"
            >
              <div
                className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                }}
              >
                {feature.icon}
              </div>
              <h3 className="dark:text-gray-400 text-black mt-6">
                {feature.title}
              </h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide dark:text-gray-400 text-black">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Background gradients adjusted for dark mode */}
        <div
          className="absolute bottom-0 left-0 z-0 h-1/3 w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right top, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 z-0 h-1/3 w-full"
          style={{
            backgroundImage:
              "linear-gradient(to left top, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)",
          }}
        ></div>
      </section>
    </div>
  );
}
