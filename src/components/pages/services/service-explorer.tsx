"use client";

import { useServices } from "@/src/hooks/use-services";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { FileCheck, ArrowRight } from "lucide-react";
import { truncateText, stripHtml } from "@/src/lib/text-utils";
import { Button } from "@/src/components/ui/button";

export const ServiceExplorer = () => {
  const { data: servicesData, isLoading } = useServices();
  const services = servicesData?.results || [];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Explore More Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover our comprehensive range of services designed to support
            your journey every step of the way.
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
              <Link href={`/services/${service.slug}`} key={service.id}>
                <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full group cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative">
                      {service.thumbnail_image ? (
                        <Image
                          src={service.thumbnail_image}
                          alt={
                            service.thumbnail_image_alt_description ||
                            service.title
                          }
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <FileCheck className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <CardTitle
                      className="text-lg line-clamp-1 group-hover:text-primary transition-colors"
                      title={service.title}
                    >
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {truncateText(stripHtml(service.description), 100)}
                    </CardDescription>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
