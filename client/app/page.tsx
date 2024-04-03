import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/HeroSection";
import Navbar from "@/components/shared/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="flex min-h-screen w-screen flex-col dark:bg-gray-900 font-inter">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
}
