import { Suspense } from "react";
import Loading from "./Loading";

export default function Layout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
