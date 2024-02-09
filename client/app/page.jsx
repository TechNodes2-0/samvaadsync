import Bento from "@/components/shared/Bento";
import CardBlog from "@/components/shared/Cards";
import FAQ from "@/components/shared/FAQ";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/HeroSection";
import Navbar from "@/components/shared/Navbar";

export default function page() {
  return (
    
    <div>
      <Navbar />

      <HeroSection />
      <CardBlog />
      <FAQ />
      <Footer />
    </div>
  );
}
