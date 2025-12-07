"use client";

import { useServices } from "@/hooks/use-services";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { FileCheck } from "lucide-react";
import { truncateText, stripHtml } from "@/lib/text-utils";

const ServicesSection = () => {
  const { data: servicesData, isLoading } = useServices();
  const services = servicesData?.results || [];

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="px-4 py-1 text-sm font-medium mb-4 bg-accent text-accent-foreground">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Support at Every Step
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From your first consultation to landing in your dream destination, 
            we provide comprehensive guidance throughout your study abroad journey.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative">
                    {service.thumbnail_image ? (
                      <Image 
                        src={service.thumbnail_image} 
                        alt={service.thumbnail_image_alt_description || service.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <FileCheck className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-lg line-clamp-1" title={service.title}>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {truncateText(stripHtml(service.description), 100)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
