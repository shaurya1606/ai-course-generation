import { HeroSection } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/Features";
import { HowItWorksSection } from "@/components/landing/HowItWorks";
import { ToolShowcaseSection } from "@/components/landing/ToolShowcase";
import { TestimonialsSection } from "@/components/landing/Testimonials";
import { FAQSection } from "@/components/landing/FAQ";
import { FinalCTASection } from "@/components/landing/FinalCTA";
import { FooterSection } from "@/components/landing/Footer";

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
