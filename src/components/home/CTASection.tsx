import { Button } from "@/src/components/ui/button";
import { Phone } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ContactDialog } from "@/src/components/popup/contact";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const CTASection = () => {
  return (
    <motion.section
      className="py-16 md:py-24 bg-background overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative bg-primary rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative">
            {/* Mobile Image - Top */}
            <div className="lg:hidden relative h-48 rounded-t-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
                alt="Students celebrating graduation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/30 to-primary" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="p-8 md:p-12 lg:p-16 text-primary-foreground">
                <span className="inline-block bg-primary-foreground/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                  Free Consultation
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Ready to Start Your<br />Study Abroad Journey?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-md">
                  Get personalized guidance from our expert counselors. We&apos;ve helped 2,000+ students achieve their dreams.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ContactDialog title="Start Your Journey">
                    <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary h-12 px-8">
                      Book Free Consultation
                    </Button>
                  </ContactDialog>
                  <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary h-12 px-8">
                    <a href="tel:+9771234567890">
                      <Phone className="mr-2 w-4 h-4" /> Call Now
                    </a>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-10 pt-8 border-t border-primary-foreground/20">
                  <div className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-bold">2,000+</div>
                    <div className="text-xs sm:text-sm text-primary-foreground/70">Students Placed</div>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-primary-foreground/20" />
                  <div className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-bold">98%</div>
                    <div className="text-xs sm:text-sm text-primary-foreground/70">Visa Success</div>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-primary-foreground/20" />
                  <div className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-bold">5</div>
                    <div className="text-xs sm:text-sm text-primary-foreground/70">Countries</div>
                  </div>
                </div>
              </div>

              {/* Desktop Image - Side */}
              <div className="hidden lg:block relative h-full min-h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
                  alt="Students celebrating graduation"
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
