'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
const countries = [
  { name: "USA", path: "/countries/usa" },
  { name: "UK", path: "/countries/uk" },
  { name: "Australia", path: "/countries/australia" },
  { name: "Canada", path: "/countries/canada" },
  { name: "New Zealand", path: "/countries/new-zealand" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              height={200}
              width={200}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium transition-colors rounded ${isActive("/") ? "" : ""
                }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 text-sm font-medium transition-colors rounded ${isActive("/about") ? "" : ""
                }`}
            >
              About Us
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 outline-none">
                Study Destinations <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full mt-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <div className="bg-background border border-border rounded-md shadow-lg min-w-[200px] ">
                  {countries.map((country) => (
                    <Link
                      key={country.path}
                      href={country.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Study in {country.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/ielts-pte"
              className={`px-4 py-2 text-sm font-medium transition-colors rounded ${isActive("/ielts-pte") ? "" : ""
                }`}
            >
              IELTS & PTE
            </Link>
            <Link
              href="/latest-updates"
              className={`px-4 py-2 text-sm font-medium transition-colors rounded ${isActive("/latest-updates") ? "" : ""
                }`}
            >
              Latest Updates
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 text-sm font-medium transition-colors rounded ${isActive("/contact") ? "" : ""
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild>
              <Link href="/contact">Free Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 font-medium hover:bg-secondary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 font-medium hover:bg-secondary transition-colors"
              >
                About Us
              </Link>
              <div className="px-4 py-2 font-medium text-muted-foreground">Study Destinations</div>
              {countries.map((country) => (
                <Link
                  key={country.path}
                  href={country.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-8 py-2 hover:bg-secondary transition-colors"
                >
                  Study in {country.name}
                </Link>
              ))}
              <Link
                href="/ielts-pte"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 font-medium hover:bg-secondary transition-colors"
              >
                IELTS & PTE
              </Link>
              <Link
                href="/latest-updates"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 font-medium hover:bg-secondary transition-colors rounded"
              >
                Latest Updates
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 font-medium hover:bg-secondary transition-colors rounded"
              >
                Contact
              </Link>
              <div className="px-4 pt-4">
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    Free Consultation
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
