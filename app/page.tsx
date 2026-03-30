import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyMe from "@/components/sections/WhyMe";
import Results from "@/components/sections/Results";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import SeoSection from "@/components/sections/SeoSection";
import Testimonials from "@/components/sections/Testimonials";
import CtaSection from "@/components/sections/CtaSection";
import Marquee from "@/components/ui/Marquee";
import CapabilityReel from "@/components/sections/CapabilityReel";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <WhyMe />
      <CapabilityReel />
      <Results />
      <Process />
      <Portfolio />
      <SeoSection />
      <Testimonials />
      <CtaSection />
    </>
  );
}
