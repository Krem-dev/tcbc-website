"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slides = [
  {
    headline: "Welcome Home",
    subtext: "A place where faith meets community, and hearts find purpose.",
    cta: "Join Us This Sunday",
    link: "/events",
    tags: ["Faith", "Community", "Growth"],
  },
  {
    headline: "Growing Together in Christ",
    subtext:
      "Experience authentic worship, meaningful fellowship, and spiritual transformation in a welcoming community.",
    cta: "Explore Our Ministries",
    link: "/ministry",
    tags: ["Faith", "Community", "Growth"],
  },
  {
    headline: "Hear the Word",
    subtext:
      "Discover powerful messages that inspire, challenge, and equip you for life's journey through biblical teaching.",
    cta: "Watch Recent Sermons",
    link: "/sermons",
    tags: ["Faith", "Community", "Growth"],
  },
  {
    headline: "Our Story, Your Story",
    subtext:
      "Learn about our mission, values, and the heart behind TCBC as we build a community rooted in faith and love.",
    cta: "About TCBC",
    link: "/about",
    tags: ["Faith", "Community", "Growth"],
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[82vh] md:h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden">
      <img
        src="/30th Nov_3.jpg"
        alt="TCBC background"
        className="
    absolute inset-0
    w-full h-auto
    min-h-full
    object-cover md:object-center
    object-[center_top]
    sm:object-center
  "
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 lg:px-12 w-full flex flex-col lg:flex-row items-end justify-between h-full pb-16">
        <div className="flex flex-col justify-center space-y-6 w-full lg:w-1/2 text-white max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].headline + "-tags"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {slides[current].tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].headline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-satoshi text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                The Chosen Bible Church
              </h1>
              <p className="font-aeonik text-lg md:text-xl text-gray-100 max-w-2xl">
                A place where faith meets community, and hearts find purpose in God's Word.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center items-start space-y-6 w-full lg:w-1/2 text-white">
          <AnimatePresence mode="wait">
            <motion.p
              key={slides[current].subtext}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl max-w-lg"
            >
              {slides[current].subtext}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].cta}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href={slides[current].link}>
                <Button className="bg-white text-black font-semibold hover:bg-gray-200 rounded-full px-6 py-3 cursor-pointer">
                  {slides[current].cta}
                </Button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
