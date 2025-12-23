import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import ukImage from "@/src/components/assets/uk-study.jpg";
import australiaImage from "@/src/components/assets/australia-study.jpg";
import canadaImage from "@/src/components/assets/canada-study.jpg";
import newzealandImage from "@/src/components/assets/newzealand-study.jpg";
import Image from "next/image";
import usaImage from "@/src/components/assets/usa-study.jpg";
const countries = [
  {
    name: "USA",
    slug: "usa",
    image: usaImage,
    description: "Home to Ivy League universities and world-leading research institutions.",
    universities: "4000+",
  },
  {
    name: "UK",
    slug: "uk",
    image: ukImage,
    description: "Historic universities with globally recognized degrees and rich culture.",
    universities: "160+",
  },
  {
    name: "Australia",
    slug: "australia",
    image: australiaImage,
    description: "High quality education with excellent post-study work opportunities.",
    universities: "43",
  },
  {
    name: "Canada",
    slug: "canada",
    image: canadaImage,
    description: "Affordable education with pathways to permanent residency.",
    universities: "100+",
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    image: newzealandImage,
    description: "Safe, beautiful country with quality education and work rights.",
    universities: "8",
  },
];

const CountriesSection = () => {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Dream Destination
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with top universities across five major study destinations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {countries.map((country, index) => (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              className={`group block ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
            >
              <Card className="p-0 h-full border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl">
                <CardContent className="p-0 h-full relative">
                  <div className={`relative overflow-hidden w-full ${index === 0 ? "h-64 lg:h-full" : "h-64 md:h-72"
                    }`}>
                    <Image
                      src={country.image}
                      alt={`Study in ${country.name}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-primary-foreground">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-bold mb-1 ${index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                          }`}>
                          Study in {country.name}
                        </h3>
                      </div>
                      <div className="w-10 h-10 bg-primary-foreground text-foreground rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:-translate-y-1">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;