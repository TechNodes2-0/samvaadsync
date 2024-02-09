// PrelineScript.jsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    // Dynamically import the "preline/preline" module
    import("preline/preline").then((preline) => {
      // Assuming preline provides access to HSStaticMethods or similar
      // This part depends on how preline exposes its functionalities
      window.HSStaticMethods = preline.HSStaticMethods;
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods && window.HSStaticMethods.autoInit) {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
  }, [path]);

  // This component renders nothing
  return null;
}
