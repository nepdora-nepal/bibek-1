"use client";

import HeroSection from "@/src/components/home/HeroSection";
import StatsSection from "@/src/components/home/StatsSection";
import ProcessSection from "@/src/components/home/ProcessSection";
import CountriesSection from "@/src/components/home/CountriesSection";
import WhyChooseUsSection from "@/src/components/home/WhyChooseUsSection";
import ServicesSection from "@/src/components/home/ServicesSection";
import TestimonialsSection from "@/src/components/home/TestimonialsSection";
import Videos from "@/src/components/home/videos/videos";
import CTASection from "@/src/components/home/CTASection";
import { motion, Variants } from "framer-motion";
import BlogSection from "../home/blog-section";
import TeamSection from "../home/team-section";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Index = () => {
  return (
    <>
      <HeroSection />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <StatsSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <TestimonialsSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Videos />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <ProcessSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <BlogSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <CountriesSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <WhyChooseUsSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <ServicesSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <TeamSection />
        <CTASection />
      </motion.div>
    </>
  );
};

export default Index;
