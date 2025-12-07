import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Book a free consultation with our expert counselors. 
              We&apos;ll help you find the perfect university and guide you through every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary" className="shadow-sm hover:shadow-xs transition-all text-base">
                <Link href="/contact">
                  Book Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="tel:+9771234567890">
                  <Phone className="mr-2 w-5 h-5" /> Call Now
                </a>
              </Button>
            </div>
          </div>

          <Card className="bg-primary-foreground/10 text-white border-2 border-primary-foreground/30 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Visit Our Office</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm opacity-80">Putalisadak, Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm opacity-80">+977 1234567890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm opacity-80">info@brainstormglobal.edu.np</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t-2 border-primary-foreground/30">
                <p className="text-sm opacity-80">
                  <span className="font-medium">Office Hours:</span> Sun - Fri, 9:00 AM - 6:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
