import CardBlog from "@/components/shared/Cards";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/HeroSection";
import Navbar from "@/components/shared/Navbar";

export default function page() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CardBlog />
      <Footer />
    </div>
  );
}
