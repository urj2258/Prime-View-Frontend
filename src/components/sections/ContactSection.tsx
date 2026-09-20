import React from "react";
import Image from "next/image";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteConfig } from "@/data/site";
import { MapPin, Phone, Mail, LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ContactSectionProps {
  isContained?: boolean;
  className?: string;
}

const ContactInfoBlock = ({
  icon: Icon,
  title,
  value,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/40 shadow-lg">
      <Icon className="w-4 h-4 text-white drop-shadow-md" />
    </div>
    <div className="text-white drop-shadow-lg">
      <p className="text-[11px] uppercase tracking-wider font-extrabold text-white/90 drop-shadow-md">
        {title}
      </p>
      <p className="text-sm lg:text-base font-bold leading-tight mt-1 max-w-[240px]">
        {value}
      </p>
    </div>
  </div>
);

export const ContactSection: React.FC<ContactSectionProps> = ({
  isContained = false,
  className = "",
}) => {
  // Shared Ambient Background
  const AmbientBackground = (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] opacity-[0.08] blur-3xl">
        <Image
          src="/images/decorative/foliage-bokeh.jpg"
          alt="Foliage Ambience"
          fill
          className="object-cover rounded-full"
        />
      </div>
    </div>
  );

  // Shared Left Visual Column Content
  const VisualColumnContent = (
    <>
      <Image
        src="/images/decorative/lush_green_valley.jpg"
        alt="Lush Green Valley - Prime View"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent backdrop-blur-[1.5px]" />

      <div
        className={`absolute inset-0 z-10 flex flex-col justify-center ${
          isContained ? "p-8 lg:p-12 xl:p-14" : "p-8 lg:p-12 xl:p-16"
        }`}
      >
        <div className={isContained ? "mb-8 lg:mb-10" : "mb-10 lg:mb-12"}>
          <ScrollReveal
            variant="blur-word"
            className={`font-display font-bold text-white drop-shadow-lg ${
              isContained
                ? "text-3xl lg:text-4xl xl:text-5xl"
                : "text-3xl lg:text-5xl"
            }`}
          >
            Get In Touch
          </ScrollReveal>
          <p className="font-sans font-semibold text-sm lg:text-base text-white drop-shadow-lg mt-3 max-w-xs leading-relaxed">
            We're here to help you secure your dream property.
          </p>
        </div>

        <div
          className={`flex flex-col ${
            isContained ? "gap-5 sm:gap-6" : "gap-6"
          }`}
        >
          <ContactInfoBlock icon={MapPin} title="Office" value={siteConfig.address} />
          <ContactInfoBlock icon={Phone} title="Call Us" value={siteConfig.phone} />
          <ContactInfoBlock icon={Mail} title="Email" value={siteConfig.email} />
        </div>
      </div>
    </>
  );

  if (isContained) {
    return (
      <section className={`relative ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 -mt-16 sm:-mt-24 lg:-mt-32 relative z-10">
          <div className="bg-[#FAF9F7] rounded-[2rem] sm:rounded-[2.5rem] border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row relative">
            {AmbientBackground}

            <div className="w-full lg:w-[45%] xl:w-[45%] relative h-[340px] sm:h-[420px] lg:h-auto lg:min-h-[540px] overflow-hidden">
              {VisualColumnContent}
            </div>

            <div className="w-full lg:w-[55%] xl:w-[55%] flex items-center px-6 sm:px-8 lg:px-12 xl:px-16 py-10 lg:py-14 bg-white/50 backdrop-blur-xs">
              <div className="w-full max-w-xl mx-auto lg:ml-0">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`bg-[#F8F7F5] text-[#151914] relative overflow-hidden flex flex-col lg:flex-row ${className}`}
    >
      {AmbientBackground}

      <div className="w-full lg:w-[45%] xl:w-[45%] relative h-[300px] sm:h-[400px] lg:h-auto lg:min-h-[500px] lg:rounded-r-[2.5rem] overflow-hidden shadow-2xl border-r border-black/[0.08]">
        {VisualColumnContent}
      </div>

      <div className="w-full lg:w-[55%] xl:w-[55%] flex items-center px-6 sm:px-8 lg:px-16 xl:px-24 py-12 lg:py-16">
        <div className="w-full max-w-xl mx-auto lg:ml-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
