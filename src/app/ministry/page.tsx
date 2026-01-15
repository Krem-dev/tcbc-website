"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart, Smile, Users, Baby, Lightbulb, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { dummyMinistries } from "@/lib/dummyData";
import { USE_DUMMY_DATA } from "@/lib/config";

interface SanityMinistry {
  _id: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
  order: number;
}

interface Ministry {
  _id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
  cta: {
    label: string;
    href: string;
  };
  image: string;
}

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    Heart: <Heart className="h-6 w-6" aria-hidden="true" />,
    Users: <Users className="h-6 w-6" aria-hidden="true" />,
    Smile: <Smile className="h-6 w-6" aria-hidden="true" />,
    Baby: <Baby className="h-6 w-6" aria-hidden="true" />,
    Lightbulb: <Lightbulb className="h-6 w-6" aria-hidden="true" />,
    MessageSquare: <MessageSquare className="h-6 w-6" aria-hidden="true" />,
  };
  return iconMap[iconName] || <Heart className="h-6 w-6" aria-hidden="true" />;
};

const FALLBACK_MINISTRIES: Ministry[] = [
  {
    _id: "1",
    title: "Youth Ministry",
    description: "Empowering young people to grow in faith, build meaningful relationships, and discover their purpose in Christ.",
    icon: <Smile className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Weekly youth group meetings with engaging activities",
      "Mentorship programs pairing youth with mature believers",
      "Mission trips and community service opportunities",
      "Leadership development and discipleship training",
    ],
    cta: {
      label: "Get Involved",
      href: "/contact",
    },
    image: "/bible-1.jpg",
  },
  {
    _id: "2",
    title: "Women's Ministry",
    description: "A supportive community where women grow together in faith, encourage one another, and live out their calling.",
    icon: <Heart className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Bible studies and prayer groups for spiritual growth",
      "Mentorship and discipleship programs",
      "Community service and outreach initiatives",
      "Conferences and spiritual retreats",
    ],
    cta: {
      label: "Join Us",
      href: "/contact",
    },
    image: "/bible-2.jpg",
  },
  {
    _id: "3",
    title: "Men's Ministry",
    description: "Building strong men of faith who lead with integrity, serve with humility, and impact their families and communities.",
    icon: <Users className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Accountability groups and Bible studies",
      "Leadership training and personal development",
      "Service projects and community impact",
      "Fellowship and brotherhood building activities",
    ],
    cta: {
      label: "Connect",
      href: "/contact",
    },
    image: "/bib-4.jpg",
  },
  {
    _id: "4",
    title: "Children's Ministry",
    description: "Creating a safe, fun, and nurturing environment where children learn about Jesus and grow in their faith.",
    icon: <Baby className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Age-appropriate Bible lessons and interactive activities",
      "Sunday school and midweek programs",
      "Vacation Bible school and special events",
      "Parent resources and family support",
    ],
    cta: {
      label: "Learn More",
      href: "/contact",
    },
    image: "/bible-1.jpg",
  },
  {
    _id: "5",
    title: "Worship Ministry",
    description: "Passionate about leading our church in authentic worship and praise through music, prayer, and corporate worship.",
    icon: <Heart className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Sunday worship service leadership",
      "Choir and worship band participation",
      "Music training and development",
      "Special worship events and concerts",
    ],
    cta: {
      label: "Join the Team",
      href: "/contact",
    },
    image: "/bible-2.jpg",
  },
  {
    _id: "6",
    title: "Community Outreach",
    description: "Serving our community with compassion and Christ's love through service, justice, and outreach programs.",
    icon: <Users className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Community service projects and volunteering",
      "Outreach to underserved populations",
      "Social justice and advocacy initiatives",
      "Partnership with local organizations",
    ],
    cta: {
      label: "Serve",
      href: "/contact",
    },
    image: "/bib-4.jpg",
  },
];

export default function MinistryPage() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [expandedSection, setExpandedSection] = useState<string>("ministry-1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const response = await fetch("/api/ministries");
        if (!response.ok) throw new Error("Failed to fetch ministries");
        const data = await response.json();
        
        const transformed = (data || []).map((m: any) => ({
          _id: m._id,
          title: m.title,
          description: m.description,
          icon: getIconComponent(m.icon),
          highlights: m.highlights,
          cta: {
            label: m.ctaLabel,
            href: m.ctaHref,
          },
          image: m.image,
        }));
        setMinistries(transformed);
        if (transformed.length > 0) {
          setExpandedSection(transformed[0]._id);
        }
      } catch (error) {
        console.error("Failed to load ministries:", error);
        setMinistries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMinistries();
  }, []);

  const displayMinistries = ministries.length > 0 ? ministries : FALLBACK_MINISTRIES;

  const toggleSection = (ministryId: string) => {
    setExpandedSection((prev) => {
      if (prev === ministryId) {
        const currentIndex = displayMinistries.findIndex((m) => m._id === ministryId);
        const nextIndex = (currentIndex + 1) % displayMinistries.length;
        return displayMinistries[nextIndex]._id;
      }
      return ministryId;
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative py-24 bg-center bg-cover"
        style={{ backgroundImage: "url('/bib-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#48007e]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-satoshi text-5xl md:text-6xl font-bold mb-6">
            Our Ministries
          </h1>

          <p className="font-aeonik text-xl max-w-3xl mx-auto mb-8">
            Discover how you can grow in faith, serve others, and make an impact through our vibrant ministry programs.
          </p>

          <div className="w-24 h-1 mx-auto bg-white" />
        </div>
      </section>

      {/* Expandable Ministries Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-8 sm:mb-16 text-center">
            <h2 className="font-satoshi text-2xl sm:text-3xl md:text-4xl font-bold text-[#48007e] mb-2 sm:mb-4">
              Get Involved
            </h2>
            <p className="font-aeonik text-sm sm:text-base md:text-lg text-gray-600">
              Explore our ministries and find where you can serve and grow in your faith journey.
            </p>
          </div>

          {/* Split Screen Layout - Exact Design from Benchmark */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[40%_60%]">
            {/* Accordion (Left) */}
            <div className="order-1 lg:order-1 overflow-hidden">
              {displayMinistries.map((ministry) => {
                const isExpanded = expandedSection === ministry._id;
                return (
                  <div key={ministry._id}>
                    <button
                      onClick={() => toggleSection(ministry._id)}
                      className={`flex w-full items-center justify-between px-4 sm:px-6 py-4 sm:py-5 transition-colors duration-200 ${
                        isExpanded ? "" : "border-b border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-lg bg-[#48007e]/10 text-[#48007e] flex-shrink-0">
                          {ministry.icon}
                        </div>
                        <h3 className="font-satoshi text-left text-base sm:text-lg md:text-xl font-semibold text-[#48007e]">
                          {ministry.title}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400 flex-shrink-0"
                      >
                        <ChevronDown className="h-6 sm:h-8 w-6 sm:w-8" aria-hidden="true" />
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
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                            <p className="font-aeonik mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base text-gray-600">
                              {ministry.description}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 sm:mb-4">
                              {ministry.highlights.map((highlight) => (
                                <div
                                  key={highlight}
                                  className="flex items-center gap-2"
                                >
                                  <div className="h-1.5 w-1.5 rounded-full bg-[#48007e] flex-shrink-0" />
                                  <span className="font-aeonik text-xs sm:text-sm text-gray-600">
                                    {highlight}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <Link
                              href={`/events?ministry=${ministry._id}`}
                              className="inline-block px-3 sm:px-4 py-2 bg-[#48007e] text-white font-aeonik font-semibold rounded-lg hover:bg-[#7c01cd] transition text-xs sm:text-sm"
                            >
                              View Events
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Image Display (Right) - Sticky on Desktop */}
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
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={displayMinistries.find((m) => m._id === expandedSection)?.image || "/bib-4.jpg"}
                          alt={displayMinistries.find((m) => m._id === expandedSection)?.title || "Ministry"}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
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

      <Footer />
    </main>
  );
}
