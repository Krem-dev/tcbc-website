"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Heart, Smile, Users, Baby, Lightbulb, MessageSquare, Camera, ShieldCheck, Truck, HandHeart, PartyPopper, Music, Paintbrush, Globe, HeartHandshake, BookOpen, Church, Megaphone, UserCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

interface Ministry {
  _id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
}

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    Heart: <Heart className="h-6 w-6" aria-hidden="true" />,
    Users: <Users className="h-6 w-6" aria-hidden="true" />,
    Smile: <Smile className="h-6 w-6" aria-hidden="true" />,
    Baby: <Baby className="h-6 w-6" aria-hidden="true" />,
    Lightbulb: <Lightbulb className="h-6 w-6" aria-hidden="true" />,
    MessageSquare: <MessageSquare className="h-6 w-6" aria-hidden="true" />,
    Camera: <Camera className="h-6 w-6" aria-hidden="true" />,
    ShieldCheck: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
    Truck: <Truck className="h-6 w-6" aria-hidden="true" />,
    HandHeart: <HandHeart className="h-6 w-6" aria-hidden="true" />,
    PartyPopper: <PartyPopper className="h-6 w-6" aria-hidden="true" />,
    Music: <Music className="h-6 w-6" aria-hidden="true" />,
    Paintbrush: <Paintbrush className="h-6 w-6" aria-hidden="true" />,
    Globe: <Globe className="h-6 w-6" aria-hidden="true" />,
    HeartHandshake: <HeartHandshake className="h-6 w-6" aria-hidden="true" />,
    BookOpen: <BookOpen className="h-6 w-6" aria-hidden="true" />,
    Church: <Church className="h-6 w-6" aria-hidden="true" />,
    Megaphone: <Megaphone className="h-6 w-6" aria-hidden="true" />,
    UserCheck: <UserCheck className="h-6 w-6" aria-hidden="true" />,
    Sparkles: <Sparkles className="h-6 w-6" aria-hidden="true" />,
  };
  return iconMap[iconName] || <Heart className="h-6 w-6" aria-hidden="true" />;
};

const FALLBACK_MINISTRIES: Ministry[] = [
  {
    _id: "1",
    title: "Media Ministry - The Chosen Lens",
    description: "Our team, the Chosen Lens captures and shares the story of what God is doing in and through our church. From photography to livestream, sound to screens, they bring clarity, creativity, and excellence to every visual and digital experience.",
    icon: <Camera className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Capturing and sharing God's story in our church",
      "Photography and livestream services",
      "Sound and screen management",
      "Bringing clarity, creativity, and excellence to digital experiences",
    ],
  },
  {
    _id: "2",
    title: "Ushering and Protocol",
    description: "Our Welcome Team creates a warm, friendly atmosphere for every service. They greet guests, guide seating, and support order during worship. With joyful hearts and helping hands, they make sure everyone feels at home.",
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Creating warm, friendly atmosphere for services",
      "Greeting guests and guiding seating",
      "Supporting order during worship",
      "Making everyone feel at home with joyful hearts",
    ],
  },
  {
    _id: "3",
    title: "Facilities, Logistics and Transportation",
    description: "Our team ensures that every church gathering happens in a safe, welcoming, and well-organized environment. From setup to support, they work behind the scenes to make ministry flow smoothly.",
    icon: <Truck className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Creating safe and welcoming worship spaces",
      "Facilities setup and maintenance",
      "Event logistics and coordination",
      "Transportation support for church activities",
    ],
  },
  {
    _id: "4",
    title: "Welfare",
    description: "Our Welfare team expresses Christ's compassion by providing care and practical support to members in times of need, ensuring no one walks alone.",
    icon: <HandHeart className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Providing care and practical assistance",
      "Supporting members during challenging times",
      "Demonstrating Christ's love through service",
      "Offering help with dignity and compassion",
    ],
  },
  {
    _id: "5",
    title: "Social Events",
    description: "Our team creates opportunities for fellowship and connection, helping build strong relationships and a sense of belonging within our church family.",
    icon: <PartyPopper className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Organizing seasonal and special events (Christmas, Easter, anniversaries)",
      "Planning family and youth-friendly activities",
      "Coordinating community outreach gatherings",
      "Creating spaces for fun, celebration, and meaningful connection",
    ],
  },
  {
    _id: "6",
    title: "Music Ministry - Heavenly Soundwaves",
    description: "Our music ministry, Heavenly Soundwaves, comprising singers and instrumentalists, leads Spirit-filled worship with a vibrant mix of gospel and contemporary music. Their sound lifts hearts and draws us closer to God in every service.",
    icon: <Music className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Leading Spirit-filled worship",
      "Vibrant mix of gospel and contemporary music",
      "Lifting hearts and drawing closer to God",
      "Excellence in worship leadership",
    ],
  },
  {
    _id: "7",
    title: "Housekeeping and Decor",
    description: "Our team creates a clean, welcoming, and beautiful space for worship and events. From decor to setup, they transform every environment with excellence and care. Their work helps set the stage for meaningful encounters with God.",
    icon: <Paintbrush className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Creating clean, welcoming, and beautiful worship spaces",
      "Decor and setup for worship and events",
      "Transforming environments with excellence and care",
      "Setting the stage for meaningful encounters with God",
    ],
  },
  {
    _id: "8",
    title: "Francophone Integration",
    description: "Our team supports French-speaking members as they connect, grow, and serve within our church community, helping build unity across cultures and languages.",
    icon: <Globe className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Supporting French-speaking members",
      "Bridging language and cultural gaps",
      "Encouraging participation in church life",
      "Fostering unity in a diverse church",
    ],
  },
  {
    _id: "9",
    title: "Marriage and Counseling",
    description: "Our team supports individuals, couples, and families through biblical counsel, prayer, and guidance, helping build healthy and God-honouring relationships.",
    icon: <HeartHandshake className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Strengthening marriages and families",
      "Biblical counseling and guidance",
      "Emotional and spiritual support",
      "Promoting healthy relationships",
    ],
  },
  {
    _id: "10",
    title: "Prayer and Intercessory",
    description: "Our team stands in prayer for the church, its leadership, and the community, believing God for direction, growth, and spiritual breakthrough.",
    icon: <BookOpen className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Interceding for the church and its leaders",
      "Covering families and ministries in prayer",
      "Seeking God's guidance and protection",
      "Believing for spiritual growth and breakthrough",
    ],
  },
  {
    _id: "11",
    title: "Children Service Teachers",
    description: "The team is dedicated to teaching, nurturing, and guiding the next generation in their walk with Christ. If this is your passion, we'd love for you to join us in shaping young hearts for the Kingdom of God!",
    icon: <Baby className="h-6 w-6" aria-hidden="true" />,
    highlights: [
      "Teaching and nurturing the next generation",
      "Guiding children in their walk with Christ",
      "Shaping young hearts for the Kingdom of God",
      "Passionate dedication to children's spiritual growth",
    ],
  },
];

const CORE_MINISTRIES = [
  {
    title: "Chosen Gents & Chosen Ladies",
    description: "Men's and women's fellowships that build faith, accountability, and meaningful community.",
    icon: <Users className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Evangelism Team",
    description: "Sharing the gospel and reaching out to our local and global community with the love of Christ.",
    icon: <Megaphone className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Chosen Kids",
    description: "Discipleship and care for children, helping them grow in faith and knowledge of God's Word.",
    icon: <Baby className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Chosen Youth",
    description: "Guiding teenagers and young adults in spiritual growth, leadership development, and active church involvement.",
    icon: <Sparkles className="h-6 w-6" aria-hidden="true" />,
  },
];

export default function MinistryPage() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [expandedSection, setExpandedSection] = useState<string>("");

  const displayMinistries = ministries.length > 0 ? ministries : FALLBACK_MINISTRIES;

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
        }));
        setMinistries(transformed);
      } catch (error) {
        console.error("Failed to load ministries:", error);
        setMinistries([]);
      }
    };

    fetchMinistries();
  }, []);

  const toggleSection = (ministryId: string) => {
    setExpandedSection((prev) => prev === ministryId ? "" : ministryId);
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

      {/* Ministries Section */}
      <section className="bg-gray-50 py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Ministry Grid - Horizontal Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {displayMinistries.map((ministry) => {
              const isExpanded = expandedSection === ministry._id;
              return (
                <button
                  key={ministry._id}
                  onClick={() => toggleSection(ministry._id)}
                  className={`text-left w-full rounded-xl border transition-all duration-300 p-5 sm:p-6 ${
                    isExpanded
                      ? "bg-[#48007e] border-[#48007e] shadow-lg"
                      : "bg-white border-gray-200 hover:border-[#48007e]/30 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex h-11 w-11 items-center justify-center rounded-lg flex-shrink-0 ${
                      isExpanded ? "bg-white/20 text-white" : "bg-[#48007e]/10 text-[#48007e]"
                    }`}>
                      {ministry.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`font-satoshi text-base sm:text-lg font-bold ${
                          isExpanded ? "text-white" : "text-[#48007e]"
                        }`}>
                          {ministry.title}
                        </h3>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className={`h-5 w-5 ${isExpanded ? "text-white" : "text-gray-400"}`} aria-hidden="true" />
                        </motion.div>
                      </div>

                      <p className={`font-aeonik text-xs sm:text-sm leading-relaxed mt-1.5 ${
                        isExpanded ? "text-white" : "text-gray-600"
                      }`}>
                        {ministry.description}
                      </p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1.5 mt-4 pt-4 border-t border-white/20">
                              {ministry.highlights.map((highlight) => (
                                <div
                                  key={highlight}
                                  className="flex items-start gap-2"
                                >
                                  <div className="h-1.5 w-1.5 rounded-full bg-white flex-shrink-0 mt-1.5" />
                                  <span className="font-aeonik text-xs sm:text-sm text-white">
                                    {highlight}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Ministries for All Members */}
      <section className="bg-white py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="font-satoshi text-2xl sm:text-3xl md:text-4xl font-bold text-[#48007e] mb-3 sm:mb-4">
              Core Ministries for All Members
            </h2>
            <p className="font-aeonik text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              At Chosen Bible Church, every member is encouraged to participate in our foundational ministries as part of their spiritual growth and active engagement in church life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CORE_MINISTRIES.map((ministry) => (
              <div
                key={ministry.title}
                className="group bg-[#48007e]/5 rounded-2xl p-6 sm:p-8 border border-[#48007e]/10 hover:border-[#48007e]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#48007e] text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {ministry.icon}
                </div>
                <h3 className="font-satoshi text-lg sm:text-xl font-bold text-[#48007e] mb-2">
                  {ministry.title}
                </h3>
                <p className="font-aeonik text-sm sm:text-base text-gray-600 leading-relaxed">
                  {ministry.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <p className="font-aeonik text-sm sm:text-base text-gray-500 italic max-w-2xl mx-auto">
              Participation in these ministries ensures every member experiences connection, growth, and service within the church family.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
