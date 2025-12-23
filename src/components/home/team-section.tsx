"use client";

import { useTeamMembers } from "@/src/hooks/use-team-member";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Skeleton } from "@/src/components/ui/skeleton";
import Image from "next/image";
import { truncateText, stripHtml } from "@/src/lib/text-utils";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const TeamSection = () => {
  const { data: teamMembers, isLoading } = useTeamMembers();

  return (
    <motion.section
      className="py-10 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-6">
        <div className="text-center mb-8">
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
              <div key={member.id} className="bg-card border-border overflow-hidden group rounded-lg cursor-pointer">
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
  );
};

export default TeamSection;
