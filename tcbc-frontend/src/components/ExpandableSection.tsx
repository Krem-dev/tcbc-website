"use client";

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronDown, Heart, Smartphone, Activity } from "lucide-react";
import Image from "next/image";

import PhoneMockup from "./serve/PhoneMockup";
import TabletMockup from "./serve/TabletMockup";

function MonitorMockup({
  images,
  altTitle,
  fit = "contain",
  autoDelay = 3500,
}: {
  images: string[];
  altTitle: string;
  fit?: "contain" | "cover";
  autoDelay?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [vw, setVw] = useState(0);

  const len = images?.length ?? 0;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => setVw(viewportRef.current?.clientWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [len]);

  const next = useCallback(() => {
    setIndex((i) => (len > 1 ? (i + 1) % len : i));
  }, [len]);

  const prev = useCallback(() => {
    setIndex((i) => (len > 1 ? (i - 1 + len) % len : i));
  }, [len]);

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;
    const threshold = Math.max(50, vw * 0.15);

    if (offsetX < -threshold || velocityX < -500) next();
    else if (offsetX > threshold || velocityX > 500) prev();

    setPaused(true);
    setTimeout(() => setPaused(false), 400);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
        e.preventDefault();
        prev();
        break;
      case "Home":
        e.preventDefault();
        setIndex(0);
        break;
      case "End":
        e.preventDefault();
        setIndex(Math.max(len - 1, 0));
        break;
    }
  };

  useEffect(() => {
    if (paused || len <= 1) return;
    const id = setInterval(next, autoDelay);
    return () => clearInterval(id);
  }, [paused, len, autoDelay, next]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  if (!len) {
    return (
      <div className="mx-auto w-full max-w-[820px]">
        <div className="relative aspect-[16/10] rounded-[22px] bg-slate-900 ring-1 ring-black/10" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[560px] select-none">
      <div className="relative aspect-[16/10] rounded-[22px] bg-slate-900 shadow-2xl ring-1 ring-black/10">
        <div className="absolute left-1/2 top-2 -translate-x-1/2 h-[6px] w-[6px] rounded-full bg-slate-300/80" />

        <div
          className="absolute inset-[10px] overflow-hidden rounded-[16px] bg-[#0b1220]"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={() => setTimeout(resume, 150)}
        >
          <div
            ref={viewportRef}
            className="relative h-full w-full"
            role="region"
            aria-roledescription="carousel"
            aria-label={altTitle}
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <motion.div
              className="flex h-full"
              drag="x"
              dragElastic={0.2}
              dragMomentum={false}
              onDragEnd={onDragEnd}
              animate={{ x: -index * vw }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              style={{ cursor: "grab" }}
            >
              {images.map((src, i) => (
                <div key={src} className="relative h-full w-full shrink-0">
                  <Image
                    src={src}
                    alt={`${altTitle} screen ${i + 1}`}
                    fill
                    sizes="(min-width: 820px) 820px, 100vw"
                    className={
                      fit === "cover" ? "object-cover" : "object-contain"
                    }
                    draggable={false}
                    priority={false}
                  />
                </div>
              ))}
            </motion.div>

            {len > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => {
                      pause();
                      setIndex(i);
                      setTimeout(resume, autoDelay + 500);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? "w-6 bg-white"
                        : "w-3 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

interface SectionFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  mockupType: "phone" | "tablet" | "monitor";
  screenshots: string[];
  features: string[];
}

const ExpandableSection = () => {
  const [expandedSection, setExpandedSection] = useState<number>(1);

  const sections: SectionFeature[] = [
    {
      id: 1,
      title: "Interactive Bible Study",
      description:
        "Engage with Scripture through our interactive Bible study platform. Access study guides, join discussion groups, and deepen your understanding of God's Word with multimedia resources.",
      icon: <Activity className="h-6 w-6" aria-hidden="true" />,
      mockupType: "tablet",
      screenshots: [
        "/bib-4.jpg",
        "/bible-1.jpg",
        "/bible-2.jpg",
        "/30th Nov_24.jpg",
      ],
      features: [
        "Study guides",
        "Discussion groups",
        "Multimedia resources",
        "Progress tracking",
      ],
    },
  ];

  const toggleSection = (sectionId: number) => {
    setExpandedSection((prev) => {
      if (prev === sectionId) {
        const currentIndex = sections.findIndex((s) => s.id === sectionId);
        const nextIndex = (currentIndex + 1) % sections.length;
        return sections[nextIndex].id;
      }
      return sectionId;
    });
  };

  const lastId = sections[sections.length - 1].id;

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-satoshi mb-4 text-4xl font-bold text-[#48007e] lg:text-5xl">
            Deepen Your{" "}
            <span className="text-[#7c01cd]">Faith</span>
          </h2>
          <p className="font-aeonik mx-auto max-w-3xl text-lg text-gray-600">
            Engage with Scripture and grow in your understanding of God's Word through our interactive Bible study platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[40%_60%]">
          <div className="order-1 lg:order-1 overflow-hidden">
            {sections.map((section) => {
              const isExpanded = expandedSection === section.id;
              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`flex w-full items-center justify-between px-6 py-5 transition-colors duration-200 ${
                      isExpanded ? "" : "border-b border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7c01cd]/10 text-[#7c01cd]">
                        {section.icon}
                      </div>
                      <h3 className="font-satoshi text-left text-xl font-semibold text-[#48007e]">
                        {section.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400"
                    >
                      <ChevronDown className="h-8 w-8" aria-hidden="true" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-b border-gray-300"
                      >
                        <div className="px-6 pb-6 pt-2">
                          <p className="font-aeonik mb-4 leading-relaxed text-gray-600">
                            {section.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {section.features.map((feature) => (
                              <div
                                key={feature}
                                className="flex items-center gap-2"
                              >
                                <div className="h-1.5 w-1.5 rounded-full bg-[#7c01cd]" />
                                <span className="font-aeonik text-sm text-gray-600">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="order-2 lg:order-2 lg:sticky lg:top-8 lg:ml-12 xl:ml-[50px]">
            <div className="relative flex items-center justify-center min-h-[420px] sm:min-h-[400px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                {expandedSection ? (
                  <motion.div
                    key={expandedSection}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {(() => {
                      const current = sections.find(
                        (s) => s.id === expandedSection
                      )!;

                      if (current.id === lastId) {
                        return (
                          <MonitorMockup
                            images={current.screenshots || []}
                            altTitle={`${current.title} preview`}
                            fit="contain"
                            autoDelay={3500}
                          />
                        );
                      }
                      if (current.mockupType === "phone") {
                        return (
                          <div className="w-full max-w-[300px] mx-auto">
                            <PhoneMockup images={current.screenshots || []} />
                          </div>
                        );
                      }
                      if (current.mockupType === "tablet") {
                        return (
                          <div className="w-full max-w-[500px] mx-auto">
                            <TabletMockup
                              images={current.screenshots || []}
                              fit="contain"
                            />
                          </div>
                        );
                      }
                    })()}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#48007e]/20">
                        <Heart
                          className="h-10 w-10 text-[#48007e]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandableSection;
