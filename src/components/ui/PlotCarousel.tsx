"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, FileText, CalendarDays, Clock, ArrowUpRight, KeyRound } from "lucide-react";

import { plots } from "@/data/plots";

export function PlotCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovered, setIsHovered]     = useState(false);
  const [gap, setGap]                 = useState(380);
  const [cardWidth, setCardWidth]     = useState(360);
  const [isMobile, setIsMobile]       = useState(false);

  // Responsive card sizing and track gap calculation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setIsMobile(true);
        setCardWidth(Math.min(w - 48, 330));
        setGap(w);
      } else if (w < 1024) {
        setIsMobile(false);
        setCardWidth(320);
        setGap(345);
      } else {
        setIsMobile(false);
        setCardWidth(360);
        setGap(385);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play timer (advances forward every 4.5s)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % plots.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % plots.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + plots.length) % plots.length);

  // True physical card offset styles — all cards exist in the DOM and glide horizontally
  const getPositionStyles = (index: number) => {
    let offset = (index - activeIndex + plots.length) % plots.length;
    if (offset > plots.length / 2) offset -= plots.length;

    const isActive = offset === 0;
    const isVisible = Math.abs(offset) <= (isMobile ? 0 : 1);
    const scale = isActive ? 1 : 0.96;
    const translateY = isActive && !isMobile ? "-52%" : "-50%";

    return {
      transform: `translate(-50%, ${translateY}) translateX(${offset * gap}px) scale(${scale})`,
      opacity: isVisible ? 1 : 0,
      zIndex: isActive ? 20 : 10 - Math.abs(offset),
      pointerEvents: (isActive || (!isMobile && Math.abs(offset) === 1)) ? ("auto" as const) : ("none" as const),
      transition: "transform 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 400ms ease, box-shadow 500ms ease",
    };
  };

  return (
    <div
      className="w-full flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 5-Card Physical Swapping Stage */}
      <div className="relative w-full max-w-6xl h-[670px] sm:h-[700px] mx-auto overflow-hidden">
        {plots.map((plot, index) => {
          let offset = index - activeIndex;
          if (offset < -2) offset += plots.length;
          if (offset > 2) offset -= plots.length;
          const isActive = offset === 0;

          return (
            <div
              key={plot.size}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                width: `${cardWidth}px`,
                ...getPositionStyles(index),
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div
                className={`
                  relative rounded-[18px] overflow-hidden transition-all duration-300
                  ${isActive
                    ? "shadow-[0_8px_32px_rgba(0,0,0,0.14)] ring-1 ring-black/[0.08]"
                    : "shadow-[0_2px_14px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
                  }
                `}
                style={{ background: "#FAF9F7" }}
              >
                {/* Tag overlay */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span
                    className="text-white text-[11px] font-semibold px-3 py-1 rounded-[6px] bg-forest-green"
                  >
                    {plot.tag}
                  </span>
                </div>

                {/* Card Image */}
                <div className="relative w-full overflow-hidden" style={{ height: "260px" }}>
                  <Image
                    src={plot.image}
                    alt={`Prime View ${plot.size} plot`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Card Body */}
                <div className="px-5 pt-4 pb-5">
                  {/* Size Title & Bold Dimensions */}
                  <div className="flex items-baseline justify-between mb-3">
                    <h3
                      className="font-display text-[2.1rem] font-bold leading-none tracking-tight text-charcoal"
                    >
                      {plot.size}
                    </h3>
                    <span
                      className="font-sans text-base sm:text-lg font-bold tracking-wide text-charcoal"
                    >
                      {plot.dimensions}
                    </span>
                  </div>

                  {/* Total Price */}
                  <div className="mb-4">
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.13em] mb-0.5 text-muted-charcoal"
                    >
                      Total Price
                    </p>
                    <p
                      className="text-[1.55rem] font-bold leading-tight text-charcoal"
                    >
                      Rs {plot.totalPrice}
                    </p>
                  </div>

                  {/* Payment Details with Dividers */}
                  <div className="space-y-0 text-[13px]">
                    {[
                      { icon: <FileText className="w-4 h-4" />,     label: `Down Payment (${plot.downPaymentPercent || "25%"})`, value: plot.downPayment },
                      { icon: <CalendarDays className="w-4 h-4" />,  label: `Monthly Installment (x${plot.monthlyCount})`,        value: plot.monthly    },
                      { icon: <Clock className="w-4 h-4" />,         label: `Half Yearly (x${plot.halfYearlyCount})`,            value: plot.halfYearly  },
                      ...(plot.possession ? [{ icon: <KeyRound className="w-4 h-4" />, label: "At the Time of Possession", value: plot.possession }] : []),
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 sm:py-2.5"
                        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
                      >
                        <span className="flex items-center gap-2 font-normal text-muted-charcoal">
                          <span className="shrink-0 text-[#8E9A80]">{row.icon}</span>
                          {row.label}
                        </span>
                        <span className="font-bold whitespace-nowrap ml-3 text-charcoal">
                          Rs {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Contact Us Button with High Contrast */}
                  <Link
                    href="/contact"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full mt-4 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-1.5 transition-all duration-200 shadow-[0_4px_14px_rgba(67,97,43,0.35)] hover:shadow-[0_6px_20px_rgba(67,97,43,0.45)] active:scale-[0.98] group/btn bg-forest-green hover:bg-[#2F441E]"
                  >
                    <span>Contact Us</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 pb-4 mt-2">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous plot plan"
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 active:scale-90 cursor-pointer border border-forest-green/20 bg-[#FAF9F7] text-forest-green hover:bg-forest-green hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dot Indicators for all 5 Cards */}
        <div className="flex items-center gap-1.5">
          {plots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Plot ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? "w-[24px] bg-forest-green" : "w-[8px] bg-forest-green/40"
              }`}
              style={{
                height:     "8px",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next plot plan"
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 active:scale-90 cursor-pointer border border-forest-green/20 bg-[#FAF9F7] text-forest-green hover:bg-forest-green hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
