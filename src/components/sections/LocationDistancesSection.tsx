"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { locations } from "@/data/locations";

export const LocationDistancesSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generates a smooth S-curve flight path from center to the target point
  const generateCurvedPath = (endX: number, endY: number) => {
    const startX = 50;
    const startY = 50;

    // Smooth bezier curve control points
    const cp1x = startX + (endX - startX) * 0.4;
    const cp1y = startY;

    const cp2x = startX + (endX - startX) * 0.6;
    const cp2y = endY;

    return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
  };

  return (
    <section className="pt-8 sm:pt-12 pb-4 sm:pb-8 bg-soft-white relative overflow-hidden border-t border-stone">

      {/* Header Area */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-8 sm:mb-10 text-center relative z-20">
        <ScrollReveal
          variant="blur-word"
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal tracking-tight"
        >
          Where Convenience Meets Home        </ScrollReveal>
        <p className="mt-4 font-sans text-sm sm:text-base text-charcoal/60 max-w-2xl mx-auto">
          Just minutes away from the Motorway, Railway Station, and major city hubs.
        </p>
      </div>

      {/* Map Diagram Area - Reduced Height */}
      <div className="relative w-full max-w-[1300px] mx-auto h-[500px] sm:h-[600px] bg-[#FAF9F7] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

        {/* Abstract City Map Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/new assests/about page logos/background map.jpg"
            alt="Map Architecture Texture"
            fill
            className="object-cover opacity-80"
            sizes="100vw"
          />
        </div>

        {/* Ambient Gradient glow to soften the edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-transparent to-[#F8FAFC] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-transparent to-[#F8FAFC] opacity-20 pointer-events-none" />

        {/* SVG Curved Connecting Lines */}
        {mounted && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {locations.map((loc, i) => (
              <motion.path
                key={loc.id}
                d={generateCurvedPath(loc.x, loc.y)}
                stroke="#137547"
                strokeWidth="4"
                strokeDasharray="8 8"
                fill="none"
                vectorEffect="non-scaling-stroke"
                className="opacity-80"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
          </svg>
        )}

        {/* Center Point: Prime View Society */}
        <div className="absolute top-1/2 left-1/2 z-20 pointer-events-auto">
          {/* Main Node Icon (Exactly centered at 50%, 50%) */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-deep-forest text-white flex items-center justify-center shadow-[0_10px_40px_rgba(16,37,30,0.4)] ring-4 ring-white relative group cursor-pointer"
            >
              {/* Pulse Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-deep-forest animate-ping opacity-50" />
              <Home className="w-6 h-6 sm:w-10 sm:h-10 fill-current" />
            </motion.div>
          </div>

          {/* Label Card (Hanging below the center) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 mt-10 sm:mt-14 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-200 shadow-lg text-center w-max"
          >
            <h3 className="font-display text-base sm:text-lg font-bold text-deep-forest">Prime View</h3>
            <p className="font-sans text-[9px] sm:text-[11px] font-bold text-charcoal/50 uppercase tracking-widest">
              Society Location
            </p>
          </motion.div>
        </div>

        {/* Surrounding Location Points */}
        {locations.map((loc, i) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 + (i * 0.1), type: "spring" }}
            className="absolute z-10 group cursor-pointer pointer-events-auto"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            {/* Map Pin Head (Exactly centered at loc.x, loc.y) */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-verified-green text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 group-hover:bg-deep-forest transition-all duration-300">
              <loc.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            {/* Information Card (Hanging below the pin) */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-6 sm:mt-8 bg-white/95 backdrop-blur-md shadow-xl rounded-xl p-2 sm:p-3 border border-gray-100 flex flex-col items-center min-w-[120px] sm:min-w-[140px] group-hover:-translate-y-1 transition-transform duration-300 w-max">
              <h4 className="font-sans text-xs sm:text-sm font-bold text-charcoal text-center leading-tight mb-1">
                {loc.title}
              </h4>
              <span className="bg-black/5 px-2 py-0.5 rounded font-mono text-[10px] sm:text-xs font-bold text-verified-green">
                {loc.distance}
              </span>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};
