"use client";

import Link from "next/link";
import { Facebook, Instagram, Loader2 } from "lucide-react";
import Image from "next/image";
import { useNewsletter } from "@/src/hooks/use-newsletter";
import { useState } from "react";
import { toast } from "sonner";

// Custom TikTok Icon from your SVG
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M21,7H20a4,4,0,0,1-4-4H12V14.5a2.5,2.5,0,1,1-4-2V8.18a6.5,6.5,0,1,0,8,6.32V9.92A8,8,0,0,0,20,11h1Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Footer Link Component
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <li>
    <Link
      href={href}
      className="opacity-80 hover:opacity-100 transition-opacity duration-200"
    >
      {children}
    </Link>
  </li>
);

// Newsletter Form Component
const NewsletterForm = () => {
  const { mutate: subscribe, isPending } = useNewsletter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    subscribe(email, {
      onSuccess: () => {
        toast.success("Successfully subscribed to the newsletter!");
        setEmail("");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full bg-primary-foreground text-primary px-4 py-3 text-sm outline-none placeholder:text-primary/50 rounded-l-sm focus:bg-primary-foreground transition-colors"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={isPending || !email}
        className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-6 py-3 text-sm font-medium transition-colors duration-200 rounded-r-sm disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap min-w-[110px] flex justify-center items-center border-l border-primary/20"
      >
        {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Subscribe"}
      </button>
    </form>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6 mt-2">
            <Link href="/" className="inline-block">
              <Image
                src="/images/white-logo.svg"
                alt="Brainstorm Global Education"
                height={70}
                width={200}
                className="object-contain"
              />
            </Link>

            <p className="text-sm opacity-80 leading-relaxed">
              Your trusted partner for studying abroad. Turning dreams into reality since 2015.
            </p>

            <div className="flex gap-3">
              <Link
                href="https://www.facebook.com/brainstormglobaleducation/"
                target="_blank"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>

              <Link
                href="https://www.instagram.com/brainstorm_abroad_education/"
                target="_blank"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>

              <Link
                href="https://www.tiktok.com/@brainstorm_education"
                target="_blank"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/countries/usa">Study in USA</FooterLink>
              <FooterLink href="/countries/uk">Study in UK</FooterLink>
              <FooterLink href="/countries/australia">Study in Australia</FooterLink>
              <FooterLink href="/countries/canada">Study in Canada</FooterLink>
              <FooterLink href="/countries/new-zealand">Study in New Zealand</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/ielts-pte">IELTS & PTE Classes</FooterLink>
              <FooterLink href="/services">Our Services</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-6 text-sm">
              <div className="space-y-1">
                <p className="font-semibold uppercase text-xs tracking-wider opacity-80">
                  Address:
                </p>
                <p className="opacity-80 leading-relaxed">
                  Putalisadak, Kathmandu, Nepal
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold uppercase text-xs tracking-wider opacity-80">
                  Email:
                </p>
                <Link
                  href="mailto:info@brainstormglobal.edu.np"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  info@brainstormglobal.edu.np
                </Link>
              </div>
              <div className="space-y-1">
                <p className="font-semibold uppercase text-xs tracking-wider opacity-80">
                  Phone:
                </p>
                <Link
                  href="tel:+9771234567890"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  +977 1234567890
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Newsletter</h3>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              Join our subscribers list to get latest news and special offers.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
          <p className="text-center md:text-left">
            Copyright {new Date().getFullYear()}. All rights reserved by{" "}
            <span className="font-medium opacity-100">Brainstorm Global Education</span>
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:opacity-100 transition-opacity">
              Terms
            </Link>
            <Link href="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy
            </Link>
            <Link href="/contact" className="hover:opacity-100 transition-opacity">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
