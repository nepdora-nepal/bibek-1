"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Target, Eye, CheckCircle, Heart,
  GraduationCap, Globe, ArrowRight
} from "lucide-react";
import Image from "next/image";
import { useTeamMembers } from "@/src/hooks/use-team-member";
import { Skeleton } from "@/src/components/ui/skeleton";
import { stripHtml, truncateText } from "@/src/lib/text-utils";
import { motion, Variants } from "framer-motion";
import CTASection from "../home/CTASection";
import { ContactDialog } from "@/src/components/popup/contact";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const values = [
  {
    icon: Heart,
    title: "Student-First Approach",
    description: "Every decision we make is guided by what's best for our students' academic and career goals.",
  },
  {
    icon: CheckCircle,
    title: "Transparency",
    description: "We believe in honest, clear communication about opportunities, costs, and expectations.",
  },
  {
    icon: GraduationCap,
    title: "Excellence",
    description: "We strive for the highest standards in counseling, training, and student support.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "Our international network ensures students get the best opportunities worldwide.",
  },
];

const About = () => {
  const { data: teamMembers, isLoading } = useTeamMembers();

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, currentColor 50px, currentColor 51px),
                             repeating-linear-gradient(90deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)`
          }} />
        </div>
        <div className="max-w-6xl mx-auto px-2 sm:px-6 relative">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Dreams, Shaping Futures Since 2015
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Brainstorm Global Education is Nepal&apos;s trusted partner for international education.
              We&apos;ve helped thousands of students achieve their dreams of studying at top universities worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <ContactDialog triggerText="Get Started" title="Get Started">
                <Button size="lg" className="shadow-sm">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </ContactDialog>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="py-10 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary flex items-center justify-center mb-4 rounded-lg">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To provide comprehensive, honest, and professional guidance to students
                  aspiring to study abroad, ensuring they make informed decisions and
                  successfully achieve their educational and career goals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary flex items-center justify-center mb-4 rounded-lg">
                  <Eye className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  To be Nepal&apos;s most trusted and respected education consultancy,
                  known for our integrity, expertise, and unwavering commitment to
                  student success in the global academic arena.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Our Story */}
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
              <Badge variant="outline" className="mb-4">
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                A Decade of Excellence in Education Consulting
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2015, Brainstorm Global Education started with a simple mission:
                  to help Nepali students access quality education abroad without the confusion
                  and stress that often comes with the process.
                </p>
                <p>
                  What began as a small office in Kathmandu has grown into one of Nepal&apos;s
                  leading education consultancies, with partnerships spanning over 100 universities
                  across USA, UK, Australia, Canada, and New Zealand.
                </p>
                <p>
                  Today, we&apos;re proud to have helped more than 5,000 students achieve their
                  study abroad dreams, with a visa success rate of over 98%.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">2015</p>
                  <p className="text-sm text-muted-foreground">Year Founded</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">5000+</p>
                  <p className="text-sm text-muted-foreground">Students Placed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">100+</p>
                  <p className="text-sm text-muted-foreground">Partner Universities</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-primary mb-2">98%</p>
                  <p className="text-sm text-muted-foreground">Visa Success Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Values */}
      <motion.section
        className="py-10 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center mx-auto mb-4 rounded-lg">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-10 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Experts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of experienced counselors and trainers are dedicated to helping you succeed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(4)].map((_, index) => (
                <Card key={index}>
                  <div className="aspect-square p-8">
                    <Skeleton className="w-full h-full rounded-full" />
                  </div>
                  <CardContent className="p-4 text-center space-y-2">
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                    <Skeleton className="h-3 w-5/6 mx-auto" />
                  </CardContent>
                </Card>
              ))
            ) : (
              (teamMembers || []).map((member) => (
                <div key={member.id} className="bg-card  border-border overflow-hidden group rounded-lg cursor-pointer">
                  <div className="aspect-square p-8">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-4xl font-bold text-secondary-foreground">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-primary text-sm font-medium">{member.role}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2" title={stripHtml(member.about)}>
                      {truncateText(stripHtml(member.about), 60)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.section>
      <CTASection />
    </>
  );
};

export default About;
