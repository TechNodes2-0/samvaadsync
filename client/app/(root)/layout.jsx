import Navbar from "@/components/shared/Navbar";

export default function Layout({ children }) {
  return (
    <section className="flex flex-col w-screen min-h-screen font-inter">
      <Navbar />

      {children}
    </section>
  );
}
