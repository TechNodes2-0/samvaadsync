import Image from "next/image";
import React from "react";
import Section from "./Section";

const testimonies = [
  {
    name: "Kanye West",
    role: "Rapper & Entrepreneur",
    message:
      "SaamvaadSync revolutionized how we communicate within our global teams. The real-time translation feature is a game-changer for our international projects.",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    profileUrl: "https://twitter.com/kanyewest",
  },
  {
    name: "Tim Cook",
    role: "CEO of Apple",
    message:
      "Integrating SaamvaadSync into our recruitment process has significantly improved our hiring efficiency. The ATS integration is seamless, and the chat with resume feature is incredibly useful.",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg",
    profileUrl: "https://twitter.com/tim_cook",
  },
  {
    name: "Parag Agrawal",
    role: "CEO of Twitter",
    message:
      "The ability to have live translated captions during video calls has removed language barriers within our team. SaamvaadSync is essential for any company looking to globalize.",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg",
    profileUrl: "https://twitter.com/paraga",
  },
  {
    name: "Satya Nadella",
    role: "CEO of Microsoft",
    message:
      "SaamvaadSync's end-to-end encryption ensures that our communications are secure. This, combined with the smart candidate search, has made it an indispensable tool for our HR department.",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg",
    profileUrl: "https://twitter.com/satyanadella",
  },
  {
    name: "Dan Schulman",
    role: "CEO of PayPal",
    message:
      "The document verification feature has streamlined our onboarding process, making it faster and more secure. SaamvaadSync is truly innovative in solving real-world recruitment challenges.",
    imageUrl:
      "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
    profileUrl: "https://twitter.com/dan_schulman",
  },
];

export default function TestimoniesSection() {
  return (
    <Section id="testimonies" className="py-20 dark:bg-slate-800 bg-white">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center">
            <div className="inline-block px-3 py-1 text-sm font-semibold dark:text-indigo-200 text-black rounded-lg md:text-center bg-gray-200 bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
              Words from Others
            </div>
            <h1 className="mb-5 text-3xl font-semibold dark:text-white text-black md:text-center md:text-5xl">
              It's not just us.
            </h1>
            <p className="text-xl dark:text-gray-200 text-gray-900 md:text-center md:text-2xl">
              Here's what others have to say about us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonies.map((testimony, index) => (
            <div key={index} className="space-y-8">
              <div className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href={testimony.profileUrl} className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg dark:bg-slate-700 bg-gray-100 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={testimony.imageUrl}
                          width={48}
                          height={48}
                          className="rounded-full"
                          alt={testimony.name}
                        />
                        <div>
                          <h3 className="text-lg font-semibold dark:text-white text-black">
                            {testimony.name}
                          </h3>
                          <p className="dark:text-gray-400 text-gray-800 text-md">
                            {testimony.role}
                          </p>
                        </div>
                      </div>
                      <p className="leading-normal dark:text-gray-300 text-gray-800 text-md">
                        {testimony.message}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
