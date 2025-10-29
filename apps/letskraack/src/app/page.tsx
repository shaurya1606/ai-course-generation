import { HeroSection } from "@/components/landing/sections/Hero";
import { FeaturesSection } from "@/components/landing/sections/Features";
import { HowItWorksSection } from "@/components/landing/sections/HowItWorks";
import { ToolShowcaseSection } from "@/components/landing/sections/ToolShowcase";
import { TestimonialsSection } from "@/components/landing/sections/Testimonials";
import { FAQSection } from "@/components/landing/sections/FAQ";
import { FinalCTASection } from "@/components/landing/sections/FinalCTA";
import { FooterSection } from "@/components/landing/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ToolShowcaseSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <FooterSection />
    </main>
  );
}
