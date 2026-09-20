import React from "react";
import {
  Zap,
  Flame,
  Droplets,
  Pipette,
  ShieldCheck,
  Building2,
  Compass,
  School,
  Dumbbell,
} from "lucide-react";

export interface AmenityVisualCard {
  title: string;
  image: string;
  icon: React.ElementType;
}

export interface AmenityChapter {
  id: string;
  stepNumber: string;
  category: string;
  title: string;
  oneLiner: string;
  heroImage: string;
  heroImageClassName?: string;
  cards: AmenityVisualCard[];
}

export const amenityChapters: AmenityChapter[] = [
  {
    id: "chapter-utilities",
    stepNumber: "01",
    category: "ESSENTIAL LIVING",
    title: "Uninterrupted Utilities",
    oneLiner: "Power, gas, and clean water — always available.",
    heroImage: "/new assests/new pic/1.jpeg",
    cards: [
      {
        title: "24/7 Power Grid",
        image: "/assets/amenities/power-grid.jpg",
        icon: Zap,
      },
      {
        title: "Natural Gas Network",
        image: "/assets/amenities/natural-gas.jpg",
        icon: Flame,
      },
      {
        title: "Filtered Potable Water",
        image: "/assets/amenities/water_station_pakistani.jpg",
        icon: Droplets,
      },
    ],
  },
  {
    id: "chapter-infrastructure",
    stepNumber: "02",
    category: "TOWN PLANNING",
    title: "Modern Infrastructure",
    oneLiner: "Built for smooth movement and long-term reliability.",
    heroImage: "/new assests/new pic/2.jpg",
    heroImageClassName: "object-cover object-center",
    cards: [
      {
        title: "Wide Carpeted Roads",
        image: "/assets/amenities/society-carpeted-road.jpg",
        icon: Compass,
      },
      {
        title: "Underground Sewerage",
        image: "/assets/amenities/underground-sewerage.jpg",
        icon: Pipette,
      },
      {
        title: "International Schools",
        image: "/assets/amenities/school_building_students.jpg",
        icon: School,
      },
    ],
  },
  {
    id: "chapter-community",
    stepNumber: "03",
    category: "LIFESTYLE & SECURITY",
    title: "Community Peace",
    oneLiner: "Safe, spiritual, and family-centered living.",
    heroImage: "/new assests/new pic/3.jpeg",
    cards: [
      {
        title: "Jamia Grand Mosque",
        image: "/assets/amenities/grand-mosque-community.jpg",
        icon: Building2,
      },
      {
        title: "24/7 Gated Security",
        image: "/assets/amenities/gated-security.jpg",
        icon: ShieldCheck,
      },
      {
        title: "Sports Facilities",
        image: "/assets/amenities/sports_arena_multiple.jpg",
        icon: Dumbbell,
      },
    ],
  },
];
