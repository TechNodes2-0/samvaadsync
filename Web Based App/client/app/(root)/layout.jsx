import Navbar from "@/components/shared/Navbar";
import RoomContextProvider from "@/context/User.context";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-inter">
      <RoomContextProvider>
        <Navbar />
        <main>{children}</main>
      </RoomContextProvider>
    </div>
  );
}
