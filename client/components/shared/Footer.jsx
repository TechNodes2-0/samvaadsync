import React from "react";
import Image from "next/image";
import Link from "next/link";
import HighitlightText from "./HighitlightText";

export default function Footer() {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <Link
            href="#"
            className="flex items-center justify-center font-medium text-white title-font md:justify-start"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl">
              {" "}
              <HighitlightText text="CulturalConnect" />
            </h2>
          </Link>
          <p className="mt-1 text-sm text-gray-500">
            Uniting India with AI-Powered Sign Language Recognition, Instant
            Language Translation, and Enhanced Chatting & Video Calling
            Features.
          </p>
        </div>
        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-white title-font">
              CATEGORIES
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  First Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Second Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Third Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Fourth Link
                </Link>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-white title-font">
              CATEGORIES
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  First Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Second Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Third Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Fourth Link
                </Link>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-white title-font">
              CATEGORIES
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  First Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Second Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Third Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Fourth Link
                </Link>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-white title-font">
              CATEGORIES
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  First Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Second Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Third Link
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Fourth Link
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 bg-opacity-75">
        <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto sm:flex-row">
          <p className="text-sm text-center text-gray-400 sm:text-left">
            © 2020 CulturalConnect —
            <Link
              href="https://twitter.com/Tech_Nodes_"
              rel="noopener noreferrer"
              className="ml-1 text-gray-500"
              target="_blank"
            >
              @TeamTechNodes
            </Link>
          </p>
          <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
            <Link href="#" className="text-gray-400">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="ml-3 text-gray-400">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </Link>
            <Link href="#" className="ml-3 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </Link>
            <Link href="#" className="ml-3 text-gray-400">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
