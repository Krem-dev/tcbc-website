"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const staticContent = {
  tags: ["Faith", "Community", "Growth"],
  headline: "The Chosen Bible Church",
  subtext: "A place where faith meets community, and hearts find purpose in God's Word.",
  cta: "Join Us This Sunday",
  link: "/events",
};

const defaultSlides = [
  { url: "/30th Nov_3.jpg" },
  { url: "/service1.jpg" },
  { url: "/service2.jpg" },
  { url: "/service3.jpg" },
];

const HeroSection = ({ onGiveClick }: { onGiveClick?: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await fetch("/api/homepage");
        if (response.ok) {
          const data = await response.json();
          if (data?.heroSection?.sliderImages && data.heroSection.sliderImages.length > 0) {
            const images = data.heroSection.sliderImages.map((img: any) => ({
              url: img.asset?.url || "/30th Nov_3.jpg",
            }));
            setSlides(images);
          }
        }
      } catch (error) {
        console.error("Failed to fetch slider images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleScrollClick = () => {
    const heroHeight = window.innerHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth",
    });
  };

  const handleServiceTimesClick = () => {
    const element = document.getElementById("service-times");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-[82vh] md:h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[current].url}
          src={slides[current].url}
          alt="TCBC background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="
    absolute inset-0
    w-full h-auto
    min-h-full
    object-cover md:object-center
    object-[center_top]
    sm:object-center
  "
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:px-12 w-full flex flex-col lg:flex-row items-end justify-between h-full pb-20 sm:pb-32">
        <div className="flex flex-col justify-center space-y-4 sm:space-y-6 w-full lg:w-1/2 text-white max-w-xl">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {staticContent.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h1 className="font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">
              {staticContent.headline}
            </h1>
            <p className="font-aeonik text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-2xl">
              {staticContent.subtext}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start space-y-4 sm:space-y-6 w-full lg:w-1/2 text-white mt-6 lg:mt-0">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-lg">
            Experience authentic worship, meaningful fellowship, and spiritual growth at The Chosen Bible Church. We'd love to see you this Sunday!
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={staticContent.link}>
              <Button className="bg-white text-black font-semibold hover:bg-gray-200 rounded-full px-6 py-3 cursor-pointer">
                {staticContent.cta}
              </Button>
            </Link>
            <button
              onClick={handleServiceTimesClick}
              className="bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/30 rounded-full px-6 py-3 cursor-pointer transition border border-white/30"
            >
              Service Times
            </button>
            <button
              onClick={onGiveClick}
              className="bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/30 rounded-full px-6 py-3 cursor-pointer transition border border-white/30"
            >
              <Heart className="w-5 h-5 inline mr-2" />
              Give
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={handleScrollClick}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-white text-xs font-aeonik uppercase tracking-widest opacity-70">
            Scroll to explore
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition">
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
