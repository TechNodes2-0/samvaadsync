import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
