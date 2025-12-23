import { FileText, Search, Plane, GraduationCap, CheckCircle, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Free Counseling",
    description: "Meet our expert counselors to discuss your goals, budget, and preferences",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "University Selection",
    description: "We shortlist the best universities and courses based on your profile",
    icon: Search,
  },
  {
    number: "03",
    title: "Application & Docs",
    description: "Complete support with applications, SOPs, and document preparation",
    icon: FileText,
  },
  {
    number: "04",
    title: "Offer Letter",
    description: "Receive admission offers from your chosen universities",
    icon: CheckCircle,
  },
  {
    number: "05",
    title: "Visa Processing",
    description: "Expert guidance through the entire visa application process",
    icon: Plane,
  },
  {
    number: "06",
    title: "Pre-Departure",
    description: "Final briefing, accommodation help, and airport pickup arrangement",
    icon: GraduationCap,
  },
];

const ProcessSection = () => {
  return (
    <section className="py-8 md:py-8 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Journey to Study Abroad
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple, transparent process that takes you from dream to reality in 6 easy steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group" style={{ animationDelay: `${index * 100}ms` }}>
              <Card className="h-full transition-all duration-300">
                <CardContent className="p-6 pt-8">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm rounded-full shadow-md z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 ">
                    <step.icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">98%</div>
            <div className="text-sm text-muted-foreground">Visa Success Rate</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">15+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
            <div className="text-sm text-muted-foreground">Partner Universities</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10K+</div>
            <div className="text-sm text-muted-foreground">Students Placed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
