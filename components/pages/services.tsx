"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ContactDialog } from "@/components/popup/contact";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useServices } from "@/hooks/use-services";

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

const truncateText = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}...` : text;

const ServiceHero = () => {
  return (
    <section className="pt-20 pb-16 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-10 max-w-4xl mx-auto">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Innovative Solutions That Drive{" "}
              <span className="italic text-primary-600">Success</span>
            </h1>
          </div>
        </motion.div>

        <motion.div
          className="rounded-3xl overflow-hidden h-[400px] md:h-[550px] w-full shadow-2xl relative group"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1774&q=80"
            alt="Services Team Meeting"
            width={1774}
            height={1000}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply"></div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceExplorer = ({ excludeSlug }: { excludeSlug?: string }) => {
  const { data: servicesData, isLoading } = useServices();
  const services =
    servicesData?.results.filter((s) => s.slug !== excludeSlug) ?? [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: "-100px 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Explore <span className="italic">Services</span>
            </h2>
          </div>
          <ContactDialog title="Get a Free Consultation">
            <Button className="rounded-full px-6">Contact Us</Button>
          </ContactDialog>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 p-10 rounded-3xl animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-8"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "-150px 0px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {services.map((service) => {
              const plainDescription = truncateText(
                stripHtml(service.description || ""),
                140
              );

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="block"
                >
                  <div className="bg-gray-50 p-10 rounded-3xl hover:bg-white hover:shadow-xl hover:border-primary-100 border border-transparent transition-all duration-300 group cursor-pointer h-full flex flex-col">
                    <div className="w-full h-40 bg-white text-primary-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-all overflow-hidden">
                      {service.thumbnail_image ? (
                        <Image
                          src={service.thumbnail_image}
                          alt={
                            service.thumbnail_image_alt_description ||
                            service.title
                          }
                          width={320}
                          height={160}
                          className="w-full h-full object-cover transition-all duration-300"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-primary-100 rounded-lg"></div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed flex-grow">
                      {plainDescription}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      Read More
                      <div className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                        <ArrowUpRight size={10} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export const Services = ({ excludeSlug }: { excludeSlug?: string }) => {
  return (
    <main>
      <ServiceHero />
      <ServiceExplorer excludeSlug={excludeSlug} />
    </main>
  );
};
