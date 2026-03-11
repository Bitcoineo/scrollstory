import MouseScroll from "./components/MouseScroll";
import StickyNav from "./components/StickyNav";
import FeaturesGrid from "./components/FeaturesGrid";
import SpecsComparison from "./components/SpecsComparison";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import CursorTrail from "./components/CursorTrail";

export default function Home() {
  return (
    <main>
      <CursorTrail />
      <StickyNav />
      <MouseScroll />
      <FeaturesGrid />
      <SpecsComparison />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
