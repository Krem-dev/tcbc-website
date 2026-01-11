"use client";

import React, { useEffect, useState } from "react";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import ExpandingCard from "@/components/ExpandingCard";
import HeroSection from "@/components/HeroSection";
import Expandable from "@/components/ExpandableSection";

export default function HomePage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isHoverable, setIsHoverable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHover = () => setIsHoverable(mqHover.matches);

    const mqMobile = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(mqMobile.matches);

    updateHover();
    updateMobile();

    mqHover.addEventListener?.("change", updateHover);
    mqMobile.addEventListener?.("change", updateMobile);

    return () => {
      mqHover.removeEventListener?.("change", updateHover);
      mqMobile.removeEventListener?.("change", updateMobile);
    };
  }, []);

  const handleToggle = (idx: number) => {
    if (!isMobile && isHoverable) return;
    setSelectedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />

      <section
        id="events"
        aria-labelledby="events-title"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              id="events-title"
              className="font-satoshi mb-4 text-4xl font-bold text-[#48007e] lg:text-5xl"
            >
              Upcoming <span className="text-[#7c01cd]">Events</span>
            </h2>
            <p className="font-aeonik mx-auto max-w-3xl text-lg text-gray-600">
              Join The Chosen Bible Church for worship, fellowship, and community events. Everyone is welcome to participate and grow together in faith.
            </p>
          </div>

          <div
            className="
              flex flex-nowrap gap-6 mb-10 overflow-x-auto snap-x snap-mandatory no-scrollbar
              md:flex-wrap md:justify-center md:overflow-visible md:snap-none
            "
          >
            <ExpandingCard
              title="Dominion Service"
              description="Experience powerful worship at The Chosen Bible Church. Inspiring messages and meaningful fellowship as we walk in dominion."
              image="/service1.jpg"
              link="/events"
            />
            <ExpandingCard
              title="CrossOver Service"
              description="Join us for transformative worship and messages that help you cross over into your destiny at The Chosen Bible Church."
              image="/service2.jpg"
              link="/events"
            />
            <ExpandingCard
              title="A Night of Noel"
              description="Celebrate the season of joy and worship with The Chosen Bible Church as we gather for a night of Noel filled with music and fellowship."
              image="/service3.jpg"
              link="/events"
            />
          </div>
        </div>
      </section>

      <Expandable />

      <section id="video-section" className="text-center mb-7">
        <VideoCard />
      </section>

      <CallToAction />

      <Footer />
    </main>
  );
}
