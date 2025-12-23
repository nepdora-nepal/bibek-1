'use client';
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, Clock, Calendar, ArrowRight, Phone 
} from "lucide-react";
import ieltsImage from "@/components/assets/ielts-class.jpg";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ContactDialog } from "@/components/popup/contact";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const features = [
  "Trainers with 10+ years experience",
  "Small batch sizes (max 15 students)",
  "Study materials included",
  "Regular mock tests with feedback",
  "Flexible morning & evening batches",
  "Free retake within 3 months",
];

const courses = [
  {
    title: "IELTS Academic",
    duration: "6-8 Weeks",
    price: "NPR 15,000",
    features: [
      "All 4 modules: Reading, Writing, Listening, Speaking",
      "20+ full practice tests",
      "One-on-one speaking sessions",
      "Band prediction tests",
      "Study materials included",
    ],
  },
  {
    title: "IELTS General",
    duration: "6-8 Weeks",
    price: "NPR 12,000",
    features: [
      "Focus on General Training modules",
      "Immigration-focused preparation",
      "Real exam simulation",
      "Weekly progress assessments",
      "Certificate of completion",
    ],
  },
  {
    title: "PTE Academic",
    duration: "4-6 Weeks",
    price: "NPR 18,000",
    features: [
      "Computer-based test training",
      "AI-scored practice sessions",
      "Speaking & writing templates",
      "Time management strategies",
      "Score improvement guarantee",
    ],
  },
];

const IeltsPte = () => {
  return (
    <>
{/* Hero Section */}
<motion.section 
  className="relative overflow-hidden py-6 md:py-8 mt-24"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
>
  {/* Background Pattern (Copied from Consultancy Hero Section) */}
  <div className="absolute inset-0 opacity-5">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 50px, currentColor 50px, currentColor 51px),
          repeating-linear-gradient(90deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)
        `
      }}
    />
  </div>

  <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span className="inline-block bg-accent text-accent-foreground px-4 py-1 text-sm font-medium mb-4">
          Language Preparation
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          IELTS & PTE Preparation Classes
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Achieve your target score with our expert-led preparation courses. 
          Comprehensive training for both IELTS and PTE with proven success rates.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <ContactDialog triggerText="Enroll Now" title="Enroll Now">
            <Button size="lg">
              Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </ContactDialog>

          <Button asChild variant="outline" size="lg">
            <a href="tel:+9771234567890">
              <Phone className="mr-2 w-5 h-5" /> Call for Details
            </a>
          </Button>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src={ieltsImage}
          width={500}
          height={500}
          alt="IELTS and PTE preparation class"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</motion.section>


      

      {/* Course Cards */}
      <motion.section 
        className="py-10 md:py-24 bg-background mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
           
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Program
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you need IELTS for university admission or PTE for faster results.
            
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </span>
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-primary">{course.price}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <ContactDialog triggerText="Enroll Now" title="Enroll Now">
                    <Button className="w-full">
                      Enroll Now
                    </Button>
                  </ContactDialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Schedule */}
      <motion.section 
        className="py-10 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-accent text-accent-foreground px-4 py-1 text-sm font-medium mb-4">
                Flexible Timing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Class Schedule
              </h2>
              <p className="text-muted-foreground mb-8">
                We offer flexible batch timings to accommodate students with 
                different schedules. Choose what works best for you.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-bold">Morning Batch</p>
                    <p className="text-sm text-muted-foreground">7:00 AM - 9:00 AM (Sun - Fri)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-bold">Day Batch</p>
                    <p className="text-sm text-muted-foreground">11:00 AM - 1:00 PM (Sun - Fri)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-bold">Evening Batch</p>
                    <p className="text-sm text-muted-foreground">4:00 PM - 6:00 PM (Sun - Fri)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">What&apos;s Included</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  New batches start every week. Limited seats available!
                </p>
                <ContactDialog triggerText="Register Now" title="Register Now">
                  <Button size="lg" className="w-full">
                    Register Now
                  </Button>
                </ContactDialog>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default IeltsPte;
