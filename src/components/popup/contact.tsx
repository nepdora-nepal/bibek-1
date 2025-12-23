'use client';

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Send } from "lucide-react";
import { useSubmitContactForm } from "@/src/hooks/use-contact";
import { ContactFormData } from "@/src/types/contact";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { Input } from "@/src/components/ui/input";

interface ContactDialogProps {
  children?: React.ReactNode;
  triggerText?: string;
  title?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const ContactDialog = ({ children, triggerText = "Contact Us", title = "Book Free Consultation" }: ContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: submitContact, isPending } = useSubmitContactForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const submissionData: ContactFormData = {
      name: fullName.trim(),
      email: email,
      phone_number: phone,
      message: message,
    };

    submitContact(submissionData, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
        toast.success("Message sent successfully!", {
          description: "We'll get back to you as soon as possible.",
        });
      },
      onError: () => {
        toast.error("Failed to send message", {
          description: "Please try again later.",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button size="lg" className="rounded-lg">
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl! max-h-[90vh] sm:max-h-[85vh] overflow-y-auto p-0 gap-0 border-none rounded-2xl sm:rounded-3xl bg-white mx-2 sm:mx-auto">
        <div className="grid md:grid-cols-2 h-full">
          {/* Left side - Image */}
          <div className="hidden md:block relative h-full min-h-[550px]">
            <Image
              src="/images/contactDialog.svg"
              alt="Contact us illustration"
              fill
              className="object-cover rounded-l-3xl"
            />
          </div>

          {/* Right side - Form */}
          <div className="p-5 sm:p-8 md:p-10 flex flex-col justify-center">
            <DialogHeader className="mb-4 sm:mb-6 space-y-1 text-left">
              <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {title}
              </DialogTitle>
            </DialogHeader>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* NAME FIELDS */}
              <motion.div className="relative" variants={itemVariants}>
                <Input
                  type="text"
                  name="fullName"
                  required
                  label="Full Name *"
                  placeholder=" "
                />
              </motion.div>

              {/* EMAIL */}
              <motion.div className="relative" variants={itemVariants}>
                <Input
                  type="email"
                  name="email"
                  required
                  label="Email Address *"
                  placeholder=" "
                />
              </motion.div>

              {/* PHONE */}
              <motion.div className="relative" variants={itemVariants}>
                <Input
                  type="tel"
                  name="phone"
                  required
                  label="Phone Number *"
                  placeholder=" "
                />
              </motion.div>

              {/* MESSAGE */}
              <motion.div className="relative" variants={itemVariants}>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your goals"
                  className="peer w-full px-3 sm:px-4 pt-5 pb-2 text-sm sm:text-base border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 resize-none"
                />
              </motion.div>

              <motion.div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4" variants={itemVariants}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl h-10 sm:h-12 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-2 font-semibold text-sm sm:text-base"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} className="flex-1 rounded-xl h-10 sm:h-12 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 text-sm sm:text-base">
                  {isPending ? "Sending..." : <><span className="hidden sm:inline">Submit Inquiry</span><span className="sm:hidden">Submit</span> <Send className="ml-1 sm:ml-2 w-4 h-4" /></>}
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
