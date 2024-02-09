"use client";
import { NavLinks } from "@/constants";
import React, { useState } from "react";
import Link from "next/link";
import HighitlightText from "./HighitlightText";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };
  return (
    <header className="z-50 flex flex-wrap w-full py-4 text-sm bg-white sm:justify-start sm:flex-nowrap dark:bg-gray-800">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            href="/"
          >
            <HighitlightText text="CulturalConnect" />
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm hs-collapse-toggle gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
              onClick={toggle}
            >
              <svg
                className="flex-shrink-0 w-4 h-4 hs-collapse-open:hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="flex-shrink-0 hidden w-4 h-4 hs-collapse-open:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hidden overflow-hidden transition-all duration-300 hs-collapse basis-full grow sm:block"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            {NavLinks.map((link, index) => (
              <Link
                key={index}
                className="font-medium text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href={link.route}
              >
                {link.title}
              </Link>
            ))}

            <div>
              <div
                className="hs-dropdown"
                data-hs-dropdown-placement="bottom-right"
                data-hs-dropdown-offset="30"
              >
                <button
                  type="button"
                  className="flex items-center font-medium text-gray-600 hs-dropdown-toggle hs-dark-mode group hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500"
                >
                  <svg
                    className="block w-4 h-4 hs-dark-mode-active:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  <svg
                    className="hidden w-4 h-4 hs-dark-mode-active:block"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 8a2 2 0 1 0 4 4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                </button>

                <div
                  id="selectThemeDropdown"
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 mt-2 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mb-2 origin-bottom-left bg-white shadow-md rounded-lg p-2 space-y-1 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                >
                  <button
                    type="button"
                    className="hs-auto-mode-active:bg-gray-100 w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    data-hs-theme-click-value="auto"
                  >
                    Auto (system default)
                  </button>
                  <button
                    type="button"
                    className="hs-default-mode-active:bg-gray-100 w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    data-hs-theme-click-value="default"
                  >
                    Default (light mode)
                  </button>
                  <button
                    type="button"
                    className="hs-dark-mode-active:bg-gray-700 w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    data-hs-theme-click-value="dark"
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </header>
  );
}
