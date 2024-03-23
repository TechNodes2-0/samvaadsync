// PrelineScript.jsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrelineScript() {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Dynamically import the "preline/preline" module
    import("preline/preline").then((preline) => {
      // Assuming preline provides access to HSStaticMethods or similar
      router.HSStaticMethods = preline.HSStaticMethods;

      // Initialize immediately after setting HSStaticMethods
      setTimeout(() => {
        if (router.HSStaticMethods?.autoInit) {
          router.HSStaticMethods.autoInit();
        }
      }, 100);
    });
  }, [path]); // Depend on path to re-trigger effect if path changes

  // This component renders nothing
  return null;
}
