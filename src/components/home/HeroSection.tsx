"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ContactDialog } from "@/src/components/popup/contact";
import { getImageUrl } from "@/src/config/site";
import { useState } from "react";

// Editable Components
import { EditableText } from "@/src/components/ui/EditableText";
import { EditableImage } from "@/src/components/ui/EditableImage";
import { StickyFormattingToolbar } from "@/src/components/ui/StickyFormattingToolbar";
import { TextSelectionProvider } from "@/src/contexts/text-selection-context";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
  }
};

const HeroSection = () => {
  const [isEditable, setIsEditable] = useState(true); // Default to true for editor experience

  const [content, setContent] = useState({
    badge: "🇳🇵 Nepal's Trusted Education Partner",
    title: 'Best Abroad Study <span class="text-primary">Consultancy</span><br />In Nepal',
    description: "Expert guidance for studying in USA, UK, Australia, Canada & New Zealand. From course selection to visa processing — we've got you covered.",
    image: getImageUrl("/assets/hero-students.jpg"),
    imageAlt: "International students celebrating graduation with global landmarks"
  });

  const handleContentChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <TextSelectionProvider>
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, currentColor 50px, currentColor 51px),
                             repeating-linear-gradient(90deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)`
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <Badge variant="secondary" className="px-4 py-1 text-sm font-medium bg-accent text-accent-foreground rounded-full inline-block">
                  <EditableText
                    value={content.badge}
                    onChange={(val) => handleContentChange("badge", val)}
                    isEditable={isEditable}
                    className="min-w-[100px]"
                  />
                </Badge>
              </div>

              <div className="mb-6">
                <EditableText
                  as="h1"
                  value={content.title}
                  onChange={(val) => handleContentChange("title", val)}
                  isEditable={isEditable}
                  className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight"
                  useHeadingFont
                />
              </div>

              <div className="mb-8 max-w-xl">
                <EditableText
                  as="p"
                  value={content.description}
                  onChange={(val) => handleContentChange("description", val)}
                  isEditable={isEditable}
                  multiline
                  className="text-lg md:text-xl text-muted-foreground"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <ContactDialog triggerText="Book Free Consultation" title="Book Free Consultation">
                  <Button size="lg" className="transition-all text-base">
                    Book Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </ContactDialog>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  10+ Years Experience
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  5000+ Students Placed
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  100+ Partner Universities
                </span>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative hidden lg:block"
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
            >
              <EditableImage
                src={content.image}
                alt={content.imageAlt}
                width={1000}
                height={600}
                isEditable={isEditable}
                onImageChange={(url, alt) => {
                  handleContentChange("image", url);
                  if (alt) handleContentChange("imageAlt", alt);
                }}
                className="w-full h-auto rounded-2xl shadow-lg border-2 border-transparent hover:border-primary/50 transition-all"
              />
            </motion.div>
          </div>
        </div>

        {/* Floating Toolbar */}
        {isEditable && <StickyFormattingToolbar />}
      </section>
    </TextSelectionProvider>
  );
};

export default HeroSection;
