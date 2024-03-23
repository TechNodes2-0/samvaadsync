"use client";
import Loading from "@/app/(root)/chat/loading";
import { getUserById } from "@/lib/actions/user.action";
import { useAuth } from "@clerk/nextjs";
import OpenAI from "openai";
import { createContext, useContext, useEffect, useState } from "react";

export const roomContext = createContext(null);

const RoomContextProvider = ({ children }) => {
  const { userId, isLoaded } = useAuth();
  const [user, setUser] = useState(null);

  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user", userId);
      const fetchedUser = await getUserById(userId);
      setUser(fetchedUser);
    };
    if (isLoaded) fetchUser();
  }, [userId, isLoaded]);

  if (!isLoaded && !user) {
    return <Loading />;
  }

  return (
    <roomContext.Provider
      value={{ user, picture: user?.picture || "", openai }}
    >
      {children}
    </roomContext.Provider>
  );
};

export default RoomContextProvider;

export const useUser = () => {
  const context = useContext(roomContext);

  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
