// pages/alan.js
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import alanBtn from "@alan-ai/alan-sdk-web";

export default function Alan() {
  const router = useRouter();

  useEffect(() => {
    alanBtn({
      key: "cfd0a64b5d2d61cab3bbdd702394de2d2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: function (commandData) {
        if (commandData && commandData.command === "openURL") {
          if (commandData.target === "_blank") {
            router.push(commandData.url);
          } else {
            router.push(commandData.url);
          }
        }
        if (commandData && commandData.command === "signout") {
          router.push("/?signout=true");
        }
      },
    });
  }, []);

  return <></>;
}
