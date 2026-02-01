import React from 'react'
import Navbar from './_components/Navbar'
import HeroSection from './_components/HeroSection'
import FeaturesSection from './_components/FeaturesSection'
import HowItWorksSection from './_components/HowItWorksSection'
import ToolShowcaseSection from './_components/ToolShowcaseSection'
import TestimonialsSection from './_components/TestimonialsSection'
import FAQSection from './_components/FAQSection'
import FinalCTASection from './_components/FinalCTASection'
import FooterSection from './_components/FooterSection'

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ToolShowcaseSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  )
}

export default Home