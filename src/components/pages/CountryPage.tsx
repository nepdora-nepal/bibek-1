'use client';

import { useParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";

import {
  GraduationCap, DollarSign, Briefcase, Clock,
  CheckCircle, ArrowRight, Globe, Award,
  Users, MapPin, Sun, Shield, Heart, Plane, BookOpen,
  TrendingUp, Star, Calendar, Phone, type LucideIcon
} from "lucide-react";

import Image, { StaticImageData } from "next/image";

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

const countryData: Record<string, {
  name: string;
  fullName: string;
  image: string | StaticImageData;
  tagline: string;
  description: string;
  extendedDescription: string;
  highlights: string[];
  whyStudy: { icon: LucideIcon; title: string; description: string }[];
  universities: { name: string; ranking: string; location: string }[];
  popularCities: { name: string; image: string }[];
  costs: { tuition: string; living: string; total: string };
  requirements: string[];
  workRights: string;
  workRightsDetails: string[];
  popularCourses: string[];
  intakes: string[];
  visaInfo: string;
  visaDetails: string[];
  scholarships: { name: string; amount: string }[];
  studentLife: string[];
  facts: { label: string; value: string }[];
}> = {
  usa: {
    name: "USA",
    fullName: "United States of America",
    image: "https://plus.unsplash.com/premium_photo-1676657955507-b1f993556e80?w=1920&auto=format&fit=crop&q=100",
    tagline: "World-Class Education & Unlimited Opportunities",
    description: "The United States is home to the world's most prestigious universities and offers unparalleled academic opportunities. With diverse programs, cutting-edge research facilities, and a multicultural environment, studying in the USA opens doors to global career opportunities.",
    extendedDescription: "The American education system is renowned for its flexibility, allowing students to explore various subjects before declaring a major. With over 4,500 accredited institutions, you'll find programs tailored to every interest and career goal. The emphasis on research, innovation, and entrepreneurship makes USA the ideal destination for ambitious students.",
    highlights: [
      "Home to 50+ of world's top 200 universities",
      "Flexible education system with major/minor options",
      "OPT allows 1-3 years post-study work",
      "World-leading research and innovation",
      "Diverse campus culture and experiences",
    ],
    whyStudy: [
      { icon: Award, title: "Global Recognition", description: "US degrees are respected worldwide, opening doors to international careers" },
      { icon: TrendingUp, title: "Career Opportunities", description: "Access to Fortune 500 companies and Silicon Valley tech giants" },
      { icon: BookOpen, title: "Research Excellence", description: "Leading research facilities and funding opportunities" },
      { icon: Users, title: "Networking", description: "Build connections with students from 200+ countries" },
    ],
    universities: [
      { name: "Harvard University", ranking: "#1 World", location: "Cambridge, MA" },
      { name: "MIT", ranking: "#2 World", location: "Cambridge, MA" },
      { name: "Stanford University", ranking: "#3 World", location: "Stanford, CA" },
      { name: "UC Berkeley", ranking: "#12 World", location: "Berkeley, CA" },
      { name: "University of Michigan", ranking: "#25 World", location: "Ann Arbor, MI" },
      { name: "University of Texas", ranking: "#38 World", location: "Austin, TX" },
      { name: "NYU", ranking: "#39 World", location: "New York, NY" },
      { name: "UCLA", ranking: "#40 World", location: "Los Angeles, CA" },
    ],
    popularCities: [
      { name: "New York", image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Boston", image: "https://images.unsplash.com/photo-1563840111261-8b096fb63b65?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9zdG9ufGVufDB8fDB8fHww" },
      { name: "San Francisco", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800&auto=format&fit=crop" },
      { name: "Chicago", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=800&auto=format&fit=crop" },
    ],
    costs: { tuition: "$20,000 - $60,000/year", living: "$15,000 - $25,000/year", total: "$35,000 - $85,000/year" },
    requirements: [
      "TOEFL (79+) or IELTS (6.5+)",
      "SAT/ACT for undergrad, GRE/GMAT for postgrad",
      "Academic transcripts and certificates",
      "Statement of Purpose (SOP)",
      "Letters of Recommendation (2-3)",
      "Valid passport and financial documents",
      "Bank statements showing sufficient funds",
      "Resume/CV for graduate programs",
    ],
    workRights: "F-1 visa allows 20 hrs/week during studies, OPT for 12-36 months post-study",
    workRightsDetails: [
      "On-campus employment: 20 hrs/week during studies",
      "CPT (Curricular Practical Training) for internships",
      "OPT: 12 months post-study work authorization",
      "STEM OPT Extension: Additional 24 months for STEM graduates",
      "Average starting salary: $55,000 - $85,000",
    ],
    popularCourses: ["Computer Science", "Business Administration", "Engineering", "Data Science", "Medicine", "Finance", "Marketing", "Psychology"],
    intakes: ["Fall (August/September) - Main", "Spring (January)", "Summer (May) - Limited"],
    visaInfo: "F-1 Student Visa required. SEVIS fee and visa interview at US Embassy.",
    visaDetails: [
      "I-20 form from university required",
      "SEVIS fee: $350",
      "Visa interview at US Embassy",
      "Financial proof required",
      "Processing time: 3-5 weeks",
    ],
    scholarships: [
      { name: "Fulbright Program", amount: "Full tuition + living" },
      { name: "University Merit Scholarships", amount: "$5,000 - $30,000/year" },
      { name: "Graduate Assistantships", amount: "Tuition waiver + stipend" },
      { name: "Need-based Financial Aid", amount: "Varies" },
    ],
    studentLife: [
      "Vibrant campus culture with 100s of clubs",
      "State-of-the-art sports facilities",
      "Diverse food options including Asian cuisine",
      "Career fairs and networking events",
      "Mental health and counseling support",
    ],
    facts: [
      { label: "International Students", value: "1M+" },
      { label: "Universities", value: "4,500+" },
      { label: "Nobel Laureates", value: "400+" },
      { label: "Nepali Students", value: "15,000+" },
    ],
  },
  uk: {
    name: "UK",
    fullName: "United Kingdom",
    image: "https://images.unsplash.com/photo-1562767332-ce0b1e2426bb?w=1920&auto=format&fit=crop&q=100",
    tagline: "Centuries of Academic Excellence",
    description: "The United Kingdom offers world-class education with centuries of academic excellence. UK degrees are globally recognized, and with shorter course durations, you can save both time and money while gaining a prestigious qualification.",
    extendedDescription: "British universities are known for their rigorous academic standards and innovative teaching methods. The UK's education system emphasizes critical thinking and independent research, preparing students for global careers. With its rich history, vibrant cities, and diverse culture, the UK offers an unparalleled student experience.",
    highlights: [
      "1-year Master's programs (save time & money)",
      "Globally recognized degrees",
      "Rich history and cultural experience",
      "Graduate Route: 2-year post-study work visa",
      "English-speaking environment",
    ],
    whyStudy: [
      { icon: Clock, title: "Shorter Duration", description: "Complete Master's in just 1 year, Bachelor's in 3 years" },
      { icon: Globe, title: "Global Hub", description: "London is a global center for finance, arts, and technology" },
      { icon: Award, title: "Prestige", description: "Home to Oxford, Cambridge, and world-renowned institutions" },
      { icon: Plane, title: "Travel Hub", description: "Easy access to Europe and beyond" },
    ],
    universities: [
      { name: "University of Oxford", ranking: "#1 World", location: "Oxford" },
      { name: "University of Cambridge", ranking: "#2 World", location: "Cambridge" },
      { name: "Imperial College London", ranking: "#6 World", location: "London" },
      { name: "UCL", ranking: "#9 World", location: "London" },
      { name: "University of Edinburgh", ranking: "#22 World", location: "Edinburgh" },
      { name: "King's College London", ranking: "#37 World", location: "London" },
      { name: "University of Manchester", ranking: "#32 World", location: "Manchester" },
      { name: "University of Bristol", ranking: "#55 World", location: "Bristol" },
    ],
    popularCities: [
      { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop" },
      { name: "Manchester", image: "https://images.unsplash.com/photo-1543832923-44667a44c804?q=80&w=800&auto=format&fit=crop" },
      { name: "Birmingham", image: "https://plus.unsplash.com/premium_photo-1663133763113-863f93d0420b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmlybWluZ2hhbXxlbnwwfHwwfHx8MA%3D%3D" },
      { name: "Edinburgh", image: "https://images.unsplash.com/photo-1569668444050-b7bc2bfec0c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWRpbmJ1cmdofGVufDB8fDB8fHww" },
    ],
    costs: { tuition: "£12,000 - £38,000/year", living: "£12,000 - £15,000/year", total: "£24,000 - £53,000/year" },
    requirements: [
      "IELTS (6.0-7.0) or equivalent",
      "Academic transcripts",
      "Personal Statement",
      "Reference letters (2)",
      "Portfolio (for creative courses)",
      "English language proof",
      "Statement of Purpose",
      "CV/Resume for postgraduate",
    ],
    workRights: "20 hrs/week during term, full-time during breaks. Graduate Route for 2 years post-study.",
    workRightsDetails: [
      "Part-time: 20 hours/week during term",
      "Full-time work during holidays",
      "Graduate Route: 2 years post-study work",
      "PhD graduates: 3-year Graduate Route",
      "Average graduate salary: £25,000 - £40,000",
    ],
    popularCourses: ["Business & Finance", "Law", "Engineering", "Medicine", "Arts & Design", "Computer Science", "Data Analytics", "International Relations"],
    intakes: ["September/October (Main)", "January/February"],
    visaInfo: "Student Visa required. CAS from university needed for application.",
    visaDetails: [
      "CAS (Confirmation of Acceptance) required",
      "IHS (Immigration Health Surcharge): £470/year",
      "Financial proof: £1,334/month for London",
      "TB test certificate required",
      "Processing time: 3-4 weeks",
    ],
    scholarships: [
      { name: "Chevening Scholarships", amount: "Full funding" },
      { name: "Commonwealth Scholarships", amount: "Full tuition + living" },
      { name: "University Scholarships", amount: "£2,000 - £10,000" },
      { name: "Great Scholarships", amount: "£10,000" },
    ],
    studentLife: [
      "Historic cities with modern amenities",
      "Rich cultural scene - museums, theaters",
      "Strong Nepali student community",
      "NHS healthcare access",
      "Easy travel across UK and Europe",
    ],
    facts: [
      { label: "International Students", value: "600K+" },
      { label: "Universities", value: "160+" },
      { label: "Nobel Laureates", value: "130+" },
      { label: "Nepali Students", value: "12,000+" },
    ],
  },
  australia: {
    name: "Australia",
    fullName: "Australia",
    image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=1920&auto=format&fit=crop&q=100",
    tagline: "World-Class Education with Exceptional Lifestyle",
    description: "Australia combines high-quality education with an exceptional lifestyle. Known for its welcoming culture, stunning landscapes, and strong economy, Australia offers excellent post-study work opportunities and pathways to permanent residency.",
    extendedDescription: "Australia's education system is regulated by the government, ensuring consistently high standards across all institutions. The country's focus on practical learning, industry connections, and research excellence makes it ideal for career-focused students. With unlimited work hours during studies and generous post-study work rights, Australia offers the best of education and opportunity.",
    highlights: [
      "7 universities in world's top 100",
      "Post-study work visa: 2-4 years",
      "High quality of life and safety",
      "Pathway to permanent residency",
      "Multicultural society",
      "Unlimited work hours for students",
    ],
    whyStudy: [
      { icon: Sun, title: "Amazing Lifestyle", description: "Beautiful beaches, great weather, and outdoor activities" },
      { icon: Shield, title: "Safe & Welcoming", description: "One of the safest countries with low crime rates" },
      { icon: TrendingUp, title: "PR Pathway", description: "Clear pathway to permanent residency through skilled migration" },
      { icon: Briefcase, title: "Work Rights", description: "Unlimited work hours during studies" },
    ],
    universities: [
      { name: "University of Melbourne", ranking: "#14 World", location: "Melbourne" },
      { name: "University of Sydney", ranking: "#18 World", location: "Sydney" },
      { name: "UNSW Sydney", ranking: "#19 World", location: "Sydney" },
      { name: "ANU", ranking: "#30 World", location: "Canberra" },
      { name: "Monash University", ranking: "#42 World", location: "Melbourne" },
      { name: "University of Queensland", ranking: "#43 World", location: "Brisbane" },
      { name: "University of Adelaide", ranking: "#89 World", location: "Adelaide" },
      { name: "UTS", ranking: "#90 World", location: "Sydney" },
    ],
    popularCities: [
      { name: "Sydney", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop" },
      { name: "Melbourne", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=800&auto=format&fit=crop" },
      { name: "Brisbane", image: "https://plus.unsplash.com/premium_photo-1694475701659-444e11e512d9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJpc2JhbmV8ZW58MHx8MHx8fDA%3D" },
      { name: "Perth", image: "https://images.unsplash.com/photo-1574471101497-d958f6e3ebd4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
    costs: { tuition: "AUD 20,000 - 45,000/year", living: "AUD 21,000 - 25,000/year", total: "AUD 41,000 - 70,000/year" },
    requirements: [
      "IELTS (6.0-7.0) or PTE (50-65)",
      "Academic qualifications",
      "Statement of Purpose (GTE)",
      "Financial capacity proof",
      "Health insurance (OSHC)",
      "Police clearance certificate",
      "Medical examination",
      "English proficiency proof",
    ],
    workRights: "Unlimited work hours during studies. Post-study work visa for 2-4 years.",
    workRightsDetails: [
      "Unlimited work hours for student visa holders",
      "Post-study work: 2 years (Bachelor's)",
      "Post-study work: 3 years (Master's)",
      "Post-study work: 4 years (PhD)",
      "Regional areas: Additional 1-2 years",
      "Average salary: AUD 55,000 - 75,000",
    ],
    popularCourses: ["IT & Computer Science", "Nursing", "Engineering", "Business", "Hospitality", "Accounting", "Education", "Health Sciences"],
    intakes: ["February (Main)", "July"],
    visaInfo: "Subclass 500 Student Visa. GTE statement required.",
    visaDetails: [
      "Subclass 500 Student Visa",
      "GTE (Genuine Temporary Entrant) statement",
      "CoE from registered institution",
      "OSHC health insurance mandatory",
      "Biometrics required",
      "Processing time: 4-6 weeks",
    ],
    scholarships: [
      { name: "Australia Awards", amount: "Full funding" },
      { name: "Destination Australia", amount: "AUD 15,000/year" },
      { name: "University Scholarships", amount: "10-50% tuition" },
      { name: "Research Training Program", amount: "Full tuition + stipend" },
    ],
    studentLife: [
      "Beautiful beaches and outdoor lifestyle",
      "Large Nepali community in major cities",
      "High minimum wage: AUD 23.23/hour",
      "Excellent public transport",
      "World-class healthcare system",
      "Vibrant multicultural food scene",
    ],
    facts: [
      { label: "International Students", value: "750K+" },
      { label: "Universities", value: "43" },
      { label: "Cities in Top 10 Livable", value: "4" },
      { label: "Nepali Students", value: "50,000+" },
    ],
  },
  canada: {
    name: "Canada",
    fullName: "Canada",
    image: "https://plus.unsplash.com/premium_photo-1694475481348-7cbe417be129?w=1920&auto=format&fit=crop&q=100",
    tagline: "Quality Education with Clear Immigration Pathways",
    description: "Canada offers world-class education at affordable costs with clear pathways to permanent residency. Known for its safety, multiculturalism, and high quality of life, Canada is an ideal destination for international students.",
    extendedDescription: "Canadian education is known for its practical approach and industry relevance. The country's friendly immigration policies make it one of the best destinations for students planning to settle abroad. With affordable tuition compared to US/UK, generous work rights, and a welcoming society, Canada offers exceptional value for international students.",
    highlights: [
      "Affordable tuition compared to US/UK",
      "PGWP: Up to 3 years post-study work",
      "Clear pathway to permanent residency",
      "Safe and multicultural society",
      "High quality of life",
      "Express Entry for skilled workers",
    ],
    whyStudy: [
      { icon: Heart, title: "Welcoming Culture", description: "One of the most immigrant-friendly countries in the world" },
      { icon: DollarSign, title: "Affordable", description: "Lower tuition compared to USA and UK" },
      { icon: MapPin, title: "PR Pathway", description: "Study and work experience counts toward immigration" },
      { icon: Shield, title: "Safe Country", description: "Consistently ranked among safest countries globally" },
    ],
    universities: [
      { name: "University of Toronto", ranking: "#21 World", location: "Toronto" },
      { name: "McGill University", ranking: "#30 World", location: "Montreal" },
      { name: "UBC", ranking: "#34 World", location: "Vancouver" },
      { name: "University of Alberta", ranking: "#111 World", location: "Edmonton" },
      { name: "University of Waterloo", ranking: "#154 World", location: "Waterloo" },
      { name: "Western University", ranking: "#172 World", location: "London, ON" },
      { name: "University of Calgary", ranking: "#182 World", location: "Calgary" },
      { name: "Simon Fraser University", ranking: "#318 World", location: "Vancouver" },
    ],
    popularCities: [
      { name: "Toronto", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=800&auto=format&fit=crop" },
      { name: "Vancouver", image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=800&auto=format&fit=crop" },
      { name: "Montreal", image: "https://plus.unsplash.com/premium_photo-1697730100119-1f40e797f395?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9udHJlYWx8ZW58MHx8MHx8fDA%3D" },
      { name: "Ottawa", image: "https://plus.unsplash.com/premium_photo-1697730030448-fbfa52261ab6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b3R0YXdhfGVufDB8fDB8fHww" },
    ],
    costs: { tuition: "CAD 15,000 - 35,000/year", living: "CAD 12,000 - 18,000/year", total: "CAD 27,000 - 53,000/year" },
    requirements: [
      "IELTS (6.0-6.5) or equivalent",
      "Academic transcripts",
      "Statement of Purpose",
      "Proof of funds (GIC + tuition)",
      "Medical examination",
      "Police clearance certificate",
      "Letter of Acceptance",
      "Study plan",
    ],
    workRights: "20 hrs/week during studies, full-time during breaks. PGWP for up to 3 years.",
    workRightsDetails: [
      "Part-time: 20 hours/week during term",
      "Full-time work during scheduled breaks",
      "PGWP: 8 months to 3 years post-study",
      "Spousal work permit available",
      "Work experience counts for PR",
      "Average salary: CAD 50,000 - 70,000",
    ],
    popularCourses: ["Computer Science", "Business Analytics", "Engineering", "Healthcare", "Data Science", "Hospitality", "Supply Chain", "Finance"],
    intakes: ["September (Fall)", "January (Winter)", "May (Summer)"],
    visaInfo: "Study Permit required. SDS program for faster processing.",
    visaDetails: [
      "Study Permit required",
      "SDS (Student Direct Stream) for faster processing",
      "GIC: CAD 20,635 required",
      "Biometrics required",
      "Medical examination",
      "Processing: 4-8 weeks (SDS: 20 days)",
    ],
    scholarships: [
      { name: "Vanier Canada Graduate", amount: "CAD 50,000/year" },
      { name: "University Scholarships", amount: "CAD 3,000 - 15,000" },
      { name: "Provincial Scholarships", amount: "Varies by province" },
      { name: "Entrance Awards", amount: "CAD 2,000 - 10,000" },
    ],
    studentLife: [
      "Beautiful natural landscapes",
      "Large South Asian community",
      "Free healthcare in most provinces",
      "High minimum wage: CAD 15-16/hour",
      "Diverse cultural festivals",
      "Winter sports and outdoor activities",
    ],
    facts: [
      { label: "International Students", value: "800K+" },
      { label: "Universities & Colleges", value: "200+" },
      { label: "Quality of Life Rank", value: "#1" },
      { label: "Nepali Students", value: "25,000+" },
    ],
  },
  "new-zealand": {
    name: "New Zealand",
    fullName: "New Zealand",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1920&auto=format&fit=crop&q=100",
    tagline: "Quality Education in Paradise",
    description: "New Zealand offers excellent education in a safe, beautiful environment. With a practical approach to learning, generous work rights, and pathways to residency, it's an increasingly popular choice for international students.",
    extendedDescription: "New Zealand's education system emphasizes practical learning and real-world application. The country's stunning natural beauty, friendly people, and high quality of life make it an attractive destination. With all universities globally ranked and generous post-study work rights, New Zealand offers excellent value for international students seeking both education and adventure.",
    highlights: [
      "All 8 universities globally ranked",
      "Post-study work visa: 1-3 years",
      "Safe and peaceful environment",
      "Stunning natural beauty",
      "Practical, hands-on education",
      "Affordable compared to Australia",
    ],
    whyStudy: [
      { icon: Sun, title: "Natural Beauty", description: "Breathtaking landscapes, adventure capital of the world" },
      { icon: Shield, title: "Safest Country", description: "Ranked #2 safest country globally" },
      { icon: Users, title: "Small Class Sizes", description: "Personal attention from professors" },
      { icon: Heart, title: "Work-Life Balance", description: "Excellent quality of life and outdoor culture" },
    ],
    universities: [
      { name: "University of Auckland", ranking: "#68 World", location: "Auckland" },
      { name: "University of Otago", ranking: "#206 World", location: "Dunedin" },
      { name: "Victoria University Wellington", ranking: "#241 World", location: "Wellington" },
      { name: "University of Canterbury", ranking: "#256 World", location: "Christchurch" },
      { name: "Massey University", ranking: "#292 World", location: "Palmerston North" },
      { name: "Lincoln University", ranking: "#368 World", location: "Lincoln" },
      { name: "University of Waikato", ranking: "#373 World", location: "Hamilton" },
      { name: "AUT", ranking: "#407 World", location: "Auckland" },
    ],
    popularCities: [
      { name: "Auckland", image: "https://images.unsplash.com/photo-1595125990323-885cec5217ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVja2xhbmR8ZW58MHx8MHx8fDA%3D" },
      { name: "Wellington", image: "https://images.unsplash.com/photo-1562620948-7ef06527f430?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VsbGluZ3RvbnxlbnwwfHwwfHx8MA%3D%3D" },
      { name: "Christchurch", image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=800&auto=format&fit=crop" },
      { name: "Dunedin", image: "https://images.unsplash.com/photo-1702742711235-d09891952156?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGR1bmVkaW58ZW58MHx8MHx8fDA%3D" },
    ],
    costs: { tuition: "NZD 22,000 - 35,000/year", living: "NZD 15,000 - 20,000/year", total: "NZD 37,000 - 55,000/year" },
    requirements: [
      "IELTS (5.5-6.5) or equivalent",
      "Academic qualifications",
      "Statement of Purpose",
      "Financial proof (NZD 20,000/year)",
      "Health & character certificates",
      "Travel insurance",
      "Genuine student declaration",
      "English proficiency proof",
    ],
    workRights: "20 hrs/week during studies, full-time during breaks. Post-study work visa for 1-3 years.",
    workRightsDetails: [
      "Part-time: 20 hours/week during term",
      "Full-time during scheduled breaks",
      "Post-study work: 1-3 years based on qualification",
      "Partner work visa available",
      "Work experience counts for residency",
      "Minimum wage: NZD 22.70/hour",
    ],
    popularCourses: ["Agriculture", "Environmental Science", "Tourism", "IT", "Engineering", "Film & Animation", "Marine Biology", "Viticulture"],
    intakes: ["February (Main)", "July"],
    visaInfo: "Student Visa required. Online application through Immigration NZ.",
    visaDetails: [
      "Student Visa application online",
      "Offer of Place from institution",
      "Financial evidence required",
      "Medical & police certificates",
      "Student Visa fee: NZD 375",
      "Processing: 4-6 weeks",
    ],
    scholarships: [
      { name: "NZ Excellence Awards", amount: "NZD 10,000 - 25,000" },
      { name: "University Scholarships", amount: "NZD 5,000 - 20,000" },
      { name: "MFAT Scholarships", amount: "Full funding" },
      { name: "Regional Scholarships", amount: "Varies" },
    ],
    studentLife: [
      "Adventure sports capital",
      "Strong sense of community",
      "Clean, green environment",
      "Friendly locals (Kiwis)",
      "Growing Nepali community",
      "Affordable public transport",
    ],
    facts: [
      { label: "International Students", value: "100K+" },
      { label: "Universities", value: "8" },
      { label: "Peace Index Rank", value: "#2" },
      { label: "Nepali Students", value: "8,000+" },
    ],
  },
};

const CountryPage = ({ countrySlug }: { countrySlug?: string }) => {
  const params = useParams<{ country: string }>();
  // Prioritize prop if available (Server Component usage), fallback to params (Client Component usage just in case)
  const country = countrySlug || params?.country;
  const data = country ? countryData[country] : null;

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Country Not Found</h1>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="relative h-[50vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Image
          src={data.image}
          alt={`Study in ${data.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/60 to-foreground/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16 w-full">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-1 text-sm font-medium mb-4">
              Study Destination
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2 sm:mb-4">
              Study in {data.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-4 sm:mb-6">
              {data.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <ContactDialog title="Apply Now">
                <Button size="lg">
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </ContactDialog>
              <Button asChild size="lg" variant="outline">
                <a href="#universities">View Universities</a>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Popular Cities Section */}
      <motion.section
        className="py-10 sm:py-16 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {data.popularCities.map((city, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl aspect-4/5 sm:aspect-square">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg sm:text-xl">{city.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="py-10 sm:py-16 md:py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 inline-block">
                Overview
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Why Study in {data.name}?</h2>
              <p className="text-muted-foreground mb-4">{data.description}</p>
              <p className="text-muted-foreground mb-6">{data.extendedDescription}</p>
              <ContactDialog triggerText="Get Free Consultation" title="Get Free Consultation">
                <Button>
                  Get Free Consultation
                </Button>
              </ContactDialog>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {data.whyStudy.map((item, index) => (
                <Card key={index} className="hover:border-primary transition-colors">
                  <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Universities Section */}
      <motion.section
        id="universities"
        className="py-10 sm:py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Top Universities in {data.name}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {data.universities.map((uni, index) => (
              <Card key={index} className="hover:border-primary transition-colors">
                <CardContent className="flex items-center justify-between p-4 sm:p-5">
                  <div>
                    <span className="font-bold text-base sm:text-lg">{uni.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{uni.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-primary bg-primary/10 hover:bg-primary/20">
                    {uni.ranking}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Content Grid */}
      <motion.section
        className="py-10 sm:py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Use flex-col-reverse on mobile so main content shows first when scrolling */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Sidebar - Shows at bottom on mobile (but user scrolls past main content first), on the right on desktop */}
            <div className="lg:col-span-1 w-full">
              <div className="lg:sticky lg:top-24 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Quick Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 shrink-0 text-primary opacity-80" />
                      <div className="w-full min-w-0">
                        <p className="font-medium text-xs sm:text-sm opacity-80">Tuition Fees</p>
                        <p className="text-xs sm:text-sm wrap-break-word">{data.costs.tuition}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 shrink-0 text-primary opacity-80" />
                      <div className="w-full min-w-0">
                        <p className="font-medium text-xs sm:text-sm opacity-80">Living Costs</p>
                        <p className="text-xs sm:text-sm wrap-break-word">{data.costs.living}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 shrink-0 text-primary opacity-80" />
                      <div className="w-full min-w-0">
                        <p className="font-medium text-xs sm:text-sm opacity-80">Intakes</p>
                        <p className="text-xs sm:text-sm wrap-break-word">{data.intakes.join(" • ")}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 shrink-0 text-primary opacity-80" />
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm opacity-80">Total Annual Cost</p>
                        <p className="font-bold text-sm sm:text-base wrap-break-word">{data.costs.total}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-center text-base sm:text-lg">Ready to Apply?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <ContactDialog title="Apply Now">
                      <Button className="w-full" size="lg">
                        Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </ContactDialog>
                    <Button variant="outline" className="w-full" size="lg" asChild>
                      <a href="tel:+977-1-XXXXXXX">
                        <Phone className="mr-2 w-4 h-4" /> Call Us
                      </a>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Free consultation • No commitment
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content - Shows first when scrolling on mobile, on the left on desktop */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full">
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    Entry Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {data.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm md:text-base">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Work Rights */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    Work Rights & Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">{data.workRights}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {data.workRightsDetails.map((detail, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 sm:p-3 border rounded-lg border-border">
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Visa Information */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                    <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    Visa Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">{data.visaInfo}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {data.visaDetails.map((detail, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 sm:p-3 border rounded-lg border-border">
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Scholarships */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    Scholarships Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {data.scholarships.map((scholarship, index) => (
                      <div key={index} className="border rounded-lg border-border p-3 sm:p-4">
                        <h3 className="font-bold text-sm sm:text-base mb-1">{scholarship.name}</h3>
                        <span className="text-xs sm:text-sm text-primary font-medium">{scholarship.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      <CTASection />

      {/* CTA */}
      {/* <section className="py-16 md:py-24 bg-secondary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Study in {data.name}?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Book a free consultation with our expert counselors who specialize in {data.name} admissions. 
            We'll guide you through every step of the process.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/ielts-pte">IELTS/PTE Preparation</Link>
            </Button>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default CountryPage;
