import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ProcessSection from "@/components/home/ProcessSection";
import CountriesSection from "@/components/home/CountriesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Videos from "@/components/home/videos/videos";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProcessSection />
      <CountriesSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <TestimonialsSection />
      <Videos />
      <CTASection />
    </>
  );
};

export default Index;
