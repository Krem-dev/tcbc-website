"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import ExpandingCard from "@/components/ExpandingCard";
import HeroSection from "@/components/HeroSection";
import Expandable from "@/components/ExpandableSection";
import EventDetailModal from "@/components/EventDetailModal";

export default function HomePage() {
  const [giveModalOpen, setGiveModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isHoverable, setIsHoverable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [homepageContent, setHomepageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchHomepageContent = async () => {
      try {
        const response = await fetch('/api/homepage');
        if (response.ok) {
          const data = await response.json();
          console.log('Homepage data received:', data);
          console.log('Pastor name from API:', data?.pastorWelcome?.pastorName);
          setHomepageContent(data);
        }
      } catch (error) {
        console.error('Failed to fetch homepage content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageContent();
  }, []);

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
      <HeroSection onGiveClick={() => setGiveModalOpen(true)} />

      {/* Give Modal */}
      <AnimatePresence>
        {giveModalOpen && (
          <div
            className="fixed left-0 right-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            onClick={() => setGiveModalOpen(false)}
            style={{ top: '4rem', bottom: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              style={{ margin: 'auto' }}
            >
              {/* Header */}
              <div className="px-6 py-6 flex justify-between items-center border-b border-gray-200">
                <h2 className="text-3xl font-bold text-[#48007e]">Give</h2>
                <button
                  onClick={() => setGiveModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-[#48007e]" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="mb-6 p-4 bg-[#48007e]/10 rounded-lg border-l-4 border-[#48007e]">
                  <p className="font-aeonik text-sm text-gray-700">
                    We give as an act of worship and gratitude, acknowledging that everything we have comes from God. Our generosity reflects trust in Him and supports the work of His Kingdom.
                  </p>
                  <p className="font-aeonik text-xs text-gray-600 mt-2 italic">
                    "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
                  </p>
                </div>

                <h3 className="text-lg font-bold text-[#48007e] mb-6">Ways to Give</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* On-Site */}
                  <div className="bg-gradient-to-br from-[#48007e]/5 to-transparent rounded-xl p-6 border border-[#48007e]/20 hover:border-[#48007e]/50 transition-all">
                    <h4 className="font-satoshi font-bold text-[#48007e] text-lg mb-3">On-Site</h4>
                    <p className="font-aeonik text-sm text-gray-700">
                      Give in person during our worship services using the offering baskets provided. You may give by cash or cheques.
                    </p>
                  </div>

                  {/* Online E-Transfer */}
                  <div className="bg-gradient-to-br from-[#48007e]/5 to-transparent rounded-xl p-6 border border-[#48007e]/20 hover:border-[#48007e]/50 transition-all">
                    <h4 className="font-satoshi font-bold text-[#48007e] text-lg mb-3">Online (E-Transfer)</h4>
                    <p className="font-aeonik text-sm text-gray-700 mb-3">
                      Give online from any device via electronic transfer from your bank anytime.
                    </p>
                    <p className="font-aeonik font-semibold text-[#48007e] text-sm break-all bg-white p-2 rounded border border-[#48007e]/20">
                      thechosenbiblechurch@gmail.com
                    </p>
                  </div>

                  {/* Pre-Authorised Giving */}
                  <div className="bg-gradient-to-br from-[#48007e]/5 to-transparent rounded-xl p-6 border border-[#48007e]/20 hover:border-[#48007e]/50 transition-all">
                    <h4 className="font-satoshi font-bold text-[#48007e] text-lg mb-3">Pre-Authorised Giving</h4>
                    <p className="font-aeonik text-sm text-gray-700">
                      Specify an amount and schedule for funds to be withdrawn from your bank account. This provides consistency and helps with effective ministry planning.
                    </p>
                  </div>

                  {/* Giving by Mail */}
                  <div className="bg-gradient-to-br from-[#48007e]/5 to-transparent rounded-xl p-6 border border-[#48007e]/20 hover:border-[#48007e]/50 transition-all">
                    <h4 className="font-satoshi font-bold text-[#48007e] text-lg mb-3">Giving by Mail</h4>
                    <p className="font-aeonik text-sm text-gray-700 mb-3">
                      Cheques can be made payable to The Chosen Bible Church and mailed to:
                    </p>
                    <div className="bg-white p-3 rounded border border-[#48007e]/20">
                      <p className="font-aeonik text-sm text-gray-700">
                        2350 Stevenage Drive, Unit 14<br />
                        Ottawa ON K1G 3W3
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* FAB - Floating Action Button */}
      <motion.button
        onClick={() => setGiveModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-[#48007e] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Give"
      >
        <Heart className="w-6 h-6 fill-current" />
      </motion.button>

      {/* Pastor Welcome Section */}
      <section className="py-16 bg-gradient-to-r from-[#48007e]/5 to-transparent border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-[#48007e]/20 border-t-[#48007e] rounded-full animate-spin" />
            </div>
          ) : homepageContent?.pastorWelcome ? (
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-center">
              {/* Image - Circle Design */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-[#48007e]/10">
                  <Image
                    src={homepageContent.pastorWelcome.pastorImage?.asset?.url || "/bib-4.jpg"}
                    alt={homepageContent.pastorWelcome.pastorName || "Pastor"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <p className="font-aeonik text-xs font-bold uppercase tracking-widest text-[#7c01cd] mb-3">
                  {homepageContent.pastorWelcome.heading || "Welcome From Our Pastor"}
                </p>

                <h3 className="font-satoshi text-3xl font-bold text-[#48007e] mb-4">
                  {homepageContent.pastorWelcome.pastorName}
                </h3>

                <div className="font-aeonik text-base text-gray-700 leading-relaxed mb-6">
                  {homepageContent.pastorWelcome.welcomeMessage?.map((block: any, idx: number) => (
                    <p key={idx} className="mb-4">
                      {block.children?.map((child: any, i: number) => (
                        <span key={i}>
                          {child.marks?.includes("strong") ? (
                            <strong>{child.text}</strong>
                          ) : (
                            child.text
                          )}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="inline-block w-fit text-[#48007e] font-aeonik font-semibold hover:text-[#7c01cd] transition"
                >
                  Learn More About Our Leadership →
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section
        aria-labelledby="service-times-heading"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              id="service-times-heading"
              className="font-satoshi mb-4 text-4xl font-bold text-[#48007e] lg:text-5xl"
            >
              {homepageContent?.upcomingEvents?.heading || "Upcoming Events"}
            </h2>
            <p className="font-aeonik mx-auto max-w-3xl text-lg text-gray-600">
              {homepageContent?.upcomingEvents?.description || "Join The Chosen Bible Church for worship, fellowship, and community events. Everyone is welcome to participate and grow together in faith."}
            </p>
          </div>

          <div
            className="
              flex flex-nowrap gap-6 mb-10 overflow-x-auto snap-x snap-mandatory no-scrollbar
              md:flex-wrap md:justify-center md:overflow-visible md:snap-none
            "
          >
            {loading ? (
              <div className="flex justify-center w-full py-12">
                <div className="w-8 h-8 border-2 border-[#48007e]/20 border-t-[#48007e] rounded-full animate-spin" />
              </div>
            ) : homepageContent?.upcomingEvents?.featuredEvents?.length > 0 ? (
              homepageContent.upcomingEvents.featuredEvents.map((event: any) => (
                <ExpandingCard
                  key={event._id}
                  title={event.title}
                  description={event.description || "Join us for this upcoming event at The Chosen Bible Church."}
                  image={event.image?.asset?.url || "/service1.jpg"}
                  onClick={() => setSelectedEvent(event)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full py-8">No upcoming events at this time.</p>
            )}
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
