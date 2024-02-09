"use client";
import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

export default function Alan() {
  useEffect(() => {
    alanBtn({
      key: "cfd0a64b5d2d61cab3bbdd702394de2d2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
        }
      },
    });
  }, []);

  return <></>;
}
