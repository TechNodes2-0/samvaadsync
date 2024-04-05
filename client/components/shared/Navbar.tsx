"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaHamburger } from "react-icons/fa";
import { ModeToggle } from "../ui/ModeToggle";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

type NavLink = {
  href: string;
  label: string;
  ariaCurrent?: "page";
};

const navLinks: NavLink[] = [
  { href: "#", label: "Chat", ariaCurrent: "page" },
  { href: "#Video", label: "Video" },
  { href: "#about", label: "About" },
  { href: "Login", label: "Login" },
];

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setHasScrolled(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        hasScrolled
          ? "bg-[rgba(255,255,255,0.1)] dark:bg-gray-900 backdrop-blur-lg border-b border-gray-200 dark:border-gray-600 "
          : "bg-transparent"
      } text-sm py-3 sm:py-0 transition-all duration-300`}
    >
      <nav
        className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Portfolio"
            className="flex-none text-xl font-semibold dark:text-white text-n-9"
          >
            SamvaadSync
          </Link>
          <button
            className="sm:hidden"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* Hamburger icon */}
            <FaHamburger className="text-2xl text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } overflow-hidden transition-all duration-300 basis-full grow sm:block`}
        >
          <div className="flex flex-col pr-1 gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
              >
                {link.label}
              </Link>
            ))}

            <ModeToggle />
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <div>
                <SignOutButton>
                  <button>Sign out</button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
}
