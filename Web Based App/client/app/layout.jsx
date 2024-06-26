"use client";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import PrelineScript from "@/components/PrelineScript";
import Script from "next/script";
import { useMemo, useState } from "react";
import { UserContext } from "./(root)/context/UserContext";
import { PreferencesContext } from "./(root)/context/PreferencesContext";

import { LanguageContext } from "@/app/(root)/context/SelectLanguage";
// Import the styles provided by the react-pdf-viewer packages

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "AI POWER CHATAPP",
//   description: "Career Counseling Bot for students and professionals.",
// };
export default function RootLayout({ children }) {
  const [user, setUser] = useState({
    videoFilter: {
      filterName: false,
      filterPayload: false,
    },
    defaultSettings: {
      publishAudio: true,
      publishVideo: true,
      audioSource: undefined,
      videoSource: undefined,
      audioOutput: undefined,
    },
  });
  const [preferences, setPreferences] = useState({
    hasSetUpPreferences: false,
    userName: null,
    conversationId: null,
  });

  const preferencesValue = useMemo(
    () => ({ preferences, setPreferences }),
    [preferences, setPreferences]
  );
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [selectedLang, setSelectedLang] = useState("en");
  return (
    <ClerkProvider>
      <UserContext.Provider value={userValue}>
        <PreferencesContext.Provider value={preferencesValue}>
          <LanguageContext.Provider value={[selectedLang, setSelectedLang]}>
            <html lang="en">
              <body className={inter.className}>{children}</body>
              <PrelineScript />
            </html>
          </LanguageContext.Provider>
        </PreferencesContext.Provider>
      </UserContext.Provider>
    </ClerkProvider>
  );
}
