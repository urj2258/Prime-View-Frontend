"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { amenityChapters } from "@/data/amenities";
import { LuxuryCard } from "@/components/ui/LuxuryCard";

export const AmenitiesSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Observer to track which chapter is currently in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chapterRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(index);
            }
          });
        },
        {
          rootMargin: "-25% 0px -40% 0px",
          threshold: 0.1,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToChapter = (index: number) => {
    setActiveStep(index);
    const target = chapterRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const current = amenityChapters[activeStep];

  return (
    <section className="py-20 sm:py-28 bg-white text-charcoal border-t border-gray-200 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* FIX: Removed items-start from grid so the columns stretch, allowing sticky to work */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* ========================================================================= */}
          {/* 1. STICKY LEFT PANEL (Pinned on desktop with High Contrast Palette) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 relative h-full">
            <div className="lg:sticky lg:top-32 z-20 space-y-6 self-start pb-10">
              {/* Main Section Kicker — Bold */}
              <span className="kicker block text-verified-green font-black text-xs sm:text-sm tracking-widest uppercase font-sans">
                MODERN FACILITIES
              </span>

              {/* Dynamic Step Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.stepNumber}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="font-display text-5xl sm:text-6xl text-charcoal font-black tracking-tight"
                    >
                      {current.stepNumber}
                    </motion.span>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.category}
                      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="text-xs font-bold uppercase tracking-wider text-charcoal bg-black/5 px-3.5 py-1.5 rounded-lg border border-black/10 shadow-xs"
                    >
                      {current.category}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-2"
                  >
                    <h2 className="font-display text-3xl sm:text-4xl text-charcoal font-bold tracking-tight leading-tight">
                      {current.title}
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-charcoal/80 font-normal leading-relaxed">
                      {current.oneLiner}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interactive Progress Indicator & Chapter Selector (Varied Contrast) */}
              <div className="pt-5 border-t border-black/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-sans mb-1">
                  <span className="font-bold text-charcoal/80 tracking-wider uppercase text-[11px]">
                    Story Chapters
                  </span>
                  <span className="font-mono text-charcoal font-bold text-xs bg-black/5 px-2.5 py-1 rounded-md border border-black/10">
                    0{activeStep + 1} / 0{amenityChapters.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {amenityChapters.map((chap, idx) => {
                    const isActive = activeStep === idx;
                    return (
                      <button
                        key={chap.id}
                        onClick={() => scrollToChapter(idx)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-sans transition-all duration-200 flex items-center justify-between group ${isActive
                          ? "bg-charcoal text-white font-bold border-2 border-black shadow-[0_6px_24px_rgba(0,0,0,0.15)]"
                          : "bg-black/5 border border-black/10 text-charcoal/80 hover:bg-black/10 hover:text-charcoal font-medium shadow-xs"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs font-bold ${isActive ? "text-emerald-400" : "text-charcoal/50"
                              }`}
                          >
                            {chap.stepNumber}
                          </span>
                          <span className="tracking-wide">{chap.title}</span>
                        </div>
                        <div
                          className={`w-2.5 h-2.5 rounded-full transition-all ${isActive
                            ? "bg-emerald-500 ring-4 ring-emerald-500/20"
                            : "bg-black/10 group-hover:bg-black/20"
                            }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. DYNAMIC RIGHT CONTENT (Clean Visuals & Photo Cards) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 space-y-20 lg:space-y-24 pt-8 lg:pt-0">
            {amenityChapters.map((chapter, idx) => (
              <motion.div
                key={chapter.id}
                ref={(el) => {
                  chapterRefs.current[idx] = el;
                }}
                className="scroll-mt-32 space-y-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Hero Visual Panel (Pure clean photography without pills on the image) */}
                <div className="relative w-full aspect-[16/8] sm:aspect-[16/7.2] max-h-[350px] rounded-2xl overflow-hidden shadow-md border border-gray-200 group bg-gray-100">
                  <Image
                    src={chapter.heroImage}
                    alt={chapter.title}
                    fill
                    className={`transition-transform duration-700 ease-out group-hover:scale-105 ${chapter.heroImageClassName || "object-cover"
                      }`}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>

                {/* Visual Photo Cards (Clean photography without overlay icons) */}
                <div
                  className={`grid grid-cols-1 ${chapter.cards.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
                    } gap-4`}
                >
                  {chapter.cards.map((card, cardIdx) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: cardIdx * 0.1, ease: "easeOut" }}
                    >
                      <LuxuryCard
                        theme="light"
                        interactive={true}
                        className="overflow-hidden group p-0 flex flex-col justify-between bg-white border border-gray-200 shadow-sm h-full"
                      >
                        {/* Card Image Thumbnail */}
                        <div
                          className={`relative w-full ${chapter.cards.length === 2
                            ? "aspect-[16/8.5] max-h-[180px]"
                            : "aspect-[16/9.5] max-h-[165px]"
                            } bg-gray-100 overflow-hidden`}
                        >
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                            sizes="(max-width: 768px) 100vw, 30vw"
                          />
                        </div>

                        {/* Crisp Title Footer */}
                        <div className="p-4 flex flex-col items-center text-center justify-center relative mt-4">
                          {/* Floating Icon Badge */}
                          <div className="absolute -top-9 w-12 h-12 rounded-2xl bg-[#F0F5F2] border border-[#2E6A4F]/20 flex items-center justify-center shadow-md shadow-[#2E6A4F]/5 pop-in-element">
                            <card.icon className="w-6 h-6 text-[#2E6A4F]" strokeWidth={1.5} />
                          </div>
                          <h4 className="font-display text-sm sm:text-base text-charcoal font-semibold tracking-tight group-hover:text-[#2E6A4F] transition-colors duration-200 mt-2">
                            {card.title}
                          </h4>
                        </div>
                      </LuxuryCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
