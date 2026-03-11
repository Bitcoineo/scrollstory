import MouseScroll from "./components/MouseScroll";
import FeaturesGrid from "./components/FeaturesGrid";
import SpecsComparison from "./components/SpecsComparison";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#080808]">
      <MouseScroll />
      <FeaturesGrid />
      <SpecsComparison />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
