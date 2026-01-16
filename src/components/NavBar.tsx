"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import MembershipModal from "./MembershipModal";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = { href: string; label: string };

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [prayerRequestModalOpen, setPrayerRequestModalOpen] = useState(false);
  const [giveModalOpen, setGiveModalOpen] = useState(false);
  const [prayerFormData, setPrayerFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Personal",
    request: "",
    isConfidential: true,
  });

  const [mobileSermonsOpen, setMobileSermonsOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

  const pathname = usePathname();

  const sermonsRef = useRef<HTMLLIElement>(null);
  const eventsRef = useRef<HTMLLIElement>(null);

  const lastScrollY = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = () => {
    const current = window.scrollY;
    if (current > lastScrollY.current && current > 100) {
      setHidden(true);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setHidden(false), 0);
    }
    lastScrollY.current = current;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        sermonsRef.current &&
        !sermonsRef.current.contains(target) &&
        eventsRef.current &&
        !eventsRef.current.contains(target)
      ) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems: NavItem[] = [
    { href: "/about", label: "About" },
    { href: "/ministry", label: "Ministry" },
    { href: "/contact", label: "Contact Us" },
  ];

  const sermonsItems: NavItem[] = [
    { href: "/sermons", label: "Recent Sermons" },
    { href: "/blog", label: "Blog" },
  ];

  const eventsItems: NavItem[] = [
    { href: "/events", label: "Events" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  const isSermonsActive = () => pathname.startsWith("/sermons");
  const isEventsActive = () => pathname.startsWith("/events");

  const handlePrayerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setPrayerFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setPrayerFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const openModal = (modalSetter: (value: boolean) => void) => {
    setMembershipModalOpen(false);
    setPrayerRequestModalOpen(false);
    setGiveModalOpen(false);
    modalSetter(true);
  };

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prayerFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit prayer request");
      }

      const result = await response.json();
      console.log("Prayer Request Submitted Successfully:", result);
      
      setPrayerFormData({
        name: "",
        email: "",
        phone: "",
        category: "Personal",
        request: "",
        isConfidential: true,
      });
      setPrayerRequestModalOpen(false);
      
      alert("Prayer request submitted successfully!");
    } catch (error) {
      console.error("Prayer request submission error:", error);
      alert("Failed to submit prayer request. Please try again.");
    }
  };

  return (
    <header
      className={`bg-white/90 backdrop-blur-md shadow-lg fixed top-0 inset-x-0 z-50 border-b border-white/20 transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-none mx-auto flex items-center justify-between px-6 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity"
            aria-label="TCBC Home"
          >
            {!logoError ? (
              <>
                <Image
                  src="/TCBC_logo_vector.pdf2-01 (2).png"
                  alt="TCBC Logo"
                  width={50}
                  height={40}
                  priority
                  className="h-8 sm:h-9 lg:h-10 w-[40px] sm:w-[45px] lg:w-[50px] object-contain"
                  onError={() => setLogoError(true)}
                  draggable={false}
                />
                <span
                  className="font-satoshi text-sm sm:text-base font-bold whitespace-nowrap"
                  style={{ color: "#48007e" }}
                >
                  The Chosen Bible Church
                </span>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#48007e" }}
                >
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span
                  className="font-satoshi text-lg sm:text-xl font-bold whitespace-nowrap"
                  style={{ color: "#48007e" }}
                >
                  TCBC
                </span>
              </div>
            )}
          </Link>
        </div>

        <nav className="hidden lg:block" aria-label="Main navigation">
          <ul className="flex items-center space-x-6 xl:space-x-8">
            {navItems
              .filter((item) => item.label !== "Sermons")
              .map((item) => {
                if (item.label === "About") {
                  return (
                    <React.Fragment key={item.href}>
                      <li>
                        <Link
                          href={item.href}
                          className={`font-aeonik font-medium transition-colors duration-300 hover:opacity-80 ${
                            isActive(item.href)
                              ? "font-bold border-b-2 pb-1"
                              : ""
                          }`}
                          style={{
                            color: isActive(item.href) ? "#48007e" : "#6b7280",
                            borderColor: isActive(item.href)
                              ? "#48007e"
                              : "transparent",
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>

                      <li className="relative group" ref={sermonsRef}>
                        <button
                          className={`flex items-center space-x-1 font-aeonik font-medium transition-colors duration-300 hover:opacity-80 ${
                            isSermonsActive()
                              ? "font-bold border-b-2 pb-1"
                              : ""
                          }`}
                          style={{
                            color: isSermonsActive() ? "#48007e" : "#6b7280",
                            borderColor: isSermonsActive()
                              ? "#48007e"
                              : "transparent",
                          }}
                          aria-haspopup="true"
                          aria-expanded={isSermonsActive()}
                          aria-label="Open Sermons menu"
                        >
                          <span>Sermons</span>
                          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                        </button>

                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-white/95 backdrop-blur-md shadow-xl rounded-lg border border-white/20 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          {sermonsItems.map((sermon) => (
                            <Link
                              key={sermon.href}
                              href={sermon.href}
                              className={`block px-4 py-3 transition-colors duration-200 hover:bg-[#b9d1f3]/30 ${
                                isActive(sermon.href) ? "bg-gray-50/80" : ""
                              }`}
                            >
                              <div
                                className="font-aeonik font-medium"
                                style={{ color: "#48007e" }}
                              >
                                {sermon.label}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </li>

                      <li>
                        <Link
                          href="/events"
                          className={`font-aeonik font-medium transition-colors duration-300 hover:opacity-80 ${
                            isEventsActive()
                              ? "font-bold border-b-2 pb-1"
                              : ""
                          }`}
                          style={{
                            color: isEventsActive() ? "#48007e" : "#6b7280",
                            borderColor: isEventsActive()
                              ? "#48007e"
                              : "transparent",
                          }}
                        >
                          Events
                        </Link>
                      </li>
                    </React.Fragment>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`font-aeonik font-medium transition-colors duration-300 hover:opacity-80 ${
                        isActive(item.href) ? "font-bold border-b-2 pb-1" : ""
                      }`}
                      style={{
                        color: isActive(item.href) ? "#113366" : "#6b7280",
                        borderColor: isActive(item.href)
                          ? "#113366"
                          : "transparent",
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => openModal(setPrayerRequestModalOpen)}
            className="rounded-full font-aeonik font-semibold text-[#48007e] border-2 transition-all duration-300 hover:bg-[#48007e]/5 px-5 py-2 text-sm xl:px-6 xl:py-2 xl:text-base"
            style={{ borderColor: "#48007e" }}
          >
            Prayer Request
          </button>
          <button
            onClick={() => openModal(setMembershipModalOpen)}
            className="rounded-full font-aeonik font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg px-5 py-2 text-sm xl:px-6 xl:py-2 xl:text-base"
            style={{ backgroundColor: "#48007e" }}
          >
            Become Member
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-full transition-colors duration-300"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1" : "mb-1"
              }`}
              style={{ backgroundColor: "#48007e" }}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                menuOpen ? "opacity-0" : "mb-1"
              }`}
              style={{ backgroundColor: "#48007e" }}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
              style={{ backgroundColor: "#48007e" }}
            />
          </div>
        </button>
      </div>

      {menuOpen && (
        <nav
          className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-white/20"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-6 py-3 font-aeonik font-medium transition-colors duration-300 hover:opacity-80 ${
                    isActive(item.href) ? "font-bold" : ""
                  }`}
                  style={{
                    color: isActive(item.href) ? "#48007e" : "#6b7280",
                    backgroundColor: isActive(item.href)
                      ? "#eff1f4"
                      : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  const newState = !mobileSermonsOpen;
                  setMobileSermonsOpen(newState);
                  if (newState) setMobileEventsOpen(false);
                }}
                className="flex justify-between items-center w-full px-6 py-3 font-aeonik font-medium transition-colors duration-300 hover:opacity-80"
                style={{ color: isSermonsActive() ? "#48007e" : "#6b7280" }}
                aria-expanded={mobileSermonsOpen}
                aria-controls="mobile-sermons-panel"
              >
                Sermons
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    mobileSermonsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileSermonsOpen && (
                <div id="mobile-sermons-panel" className="bg-white/90">
                  {sermonsItems.map((sermon) => (
                    <Link
                      key={sermon.href}
                      href={sermon.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-8 py-2 font-aeonik font-medium transition-colors duration-300 hover:opacity-80 ${
                        isActive(sermon.href) ? "font-bold" : ""
                      }`}
                      style={{
                        color: isActive(sermon.href) ? "#48007e" : "#6b7280",
                        backgroundColor: isActive(sermon.href)
                          ? "#eff1f4"
                          : "transparent",
                      }}
                    >
                      {sermon.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <button
                onClick={() => {
                  const newState = !mobileEventsOpen;
                  setMobileEventsOpen(newState);
                  if (newState) setMobileSermonsOpen(false);
                }}
                className="flex justify-between items-center w-full px-6 py-3 font-aeonik font-medium transition-colors duration-300 hover:opacity-80"
                style={{ color: isEventsActive() ? "#48007e" : "#6b7280" }}
                aria-expanded={mobileEventsOpen}
                aria-controls="mobile-events-panel"
              >
                Events
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    mobileEventsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileEventsOpen && (
                <div id="mobile-events-panel" className="bg-white/90">
                  {eventsItems.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-8 py-2 font-aeonik font-medium transition-colors duration-300 hover:opacity-80 ${
                        isActive(link.href) ? "font-bold" : ""
                      }`}
                      style={{
                        color: isActive(link.href) ? "#48007e" : "#6b7280",
                        backgroundColor: isActive(link.href)
                          ? "#eff1f4"
                          : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li className="px-6 pt-4">
              <button
                onClick={() => {
                  openModal(setMembershipModalOpen);
                  setMenuOpen(false);
                }}
                className="block w-full text-center px-6 py-3 rounded-lg font-aeonik font-semibold text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "#48007e" }}
              >
                Become Member
              </button>
            </li>
          </ul>
        </nav>
      )}

      <MembershipModal
        isOpen={membershipModalOpen}
        onClose={() => setMembershipModalOpen(false)}
      />

      {/* Give Modal */}
      <AnimatePresence>
        {giveModalOpen && (
          <div
            className="fixed left-0 right-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setGiveModalOpen(false);
              }
            }}
            style={{ top: '4rem', bottom: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
              style={{ margin: 'auto' }}
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setGiveModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-[#48007e]" />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 pb-8">
                <h2 className="text-3xl font-bold text-[#48007e] mb-8">Give</h2>
                
                <div className="space-y-4">
                  {/* Local Giving */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-aeonik text-sm font-semibold text-gray-700 mb-2">
                      Local Donations
                    </p>
                    <p className="font-aeonik font-semibold text-[#48007e] break-all">
                      giving@tcbc.church
                    </p>
                  </div>

                  {/* International Giving */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-aeonik text-sm font-semibold text-gray-700 mb-2">
                      International Donations
                    </p>
                    <p className="font-aeonik text-sm text-gray-600">
                      Please contact us at
                    </p>
                    <a 
                      href="mailto:international@tcbc.church"
                      className="font-aeonik font-semibold text-[#48007e] hover:text-[#7c01cd] transition break-all"
                    >
                      international@tcbc.church
                    </a>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setGiveModalOpen(false)}
                  className="w-full mt-6 py-3 bg-[#48007e] text-white font-semibold rounded-lg hover:bg-[#7c01cd] transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Prayer Request Modal */}
      <AnimatePresence>
        {prayerRequestModalOpen && (
          <div
            className="fixed left-0 right-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setPrayerRequestModalOpen(false);
              }
            }}
            style={{ top: '4rem', bottom: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
              style={{ margin: 'auto' }}
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setPrayerRequestModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-[#48007e]" />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 pb-8">
                <form onSubmit={handlePrayerSubmit} className="space-y-8">
                  <h2 className="text-3xl font-bold text-[#48007e] mb-8">Prayer Request</h2>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={prayerFormData.name}
                      onChange={handlePrayerInputChange}
                      required
                      placeholder="Enter your name"
                      className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={prayerFormData.email}
                      onChange={handlePrayerInputChange}
                      placeholder="Enter your email"
                      className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={prayerFormData.phone}
                      onChange={handlePrayerInputChange}
                      placeholder="Enter your phone number"
                      className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Prayer Request Category
                    </label>
                    <select
                      name="category"
                      value={prayerFormData.category}
                      onChange={handlePrayerInputChange}
                      className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                    >
                      <option className="bg-white text-gray-800">Personal</option>
                      <option className="bg-white text-gray-800">Family & Relationships</option>
                      <option className="bg-white text-gray-800">Health & Healing</option>
                      <option className="bg-white text-gray-800">Thanksgiving & Praise</option>
                    </select>
                  </div>

                  {/* Prayer Request */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Your Prayer Request
                    </label>
                    <textarea
                      name="request"
                      value={prayerFormData.request}
                      onChange={handlePrayerInputChange}
                      placeholder="Share your prayer request in detail..."
                      rows={4}
                      className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2 resize-none"
                    />
                  </div>

                  {/* Confidentiality */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="isConfidential"
                      checked={prayerFormData.isConfidential}
                      onChange={handlePrayerInputChange}
                      className="w-4 h-4 rounded accent-[#48007e]"
                    />
                    <label className="text-sm text-gray-700">
                      Keep this prayer request confidential
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setPrayerRequestModalOpen(false)}
                      className="flex-1 py-3 border-2 border-[#48007e] text-[#48007e] font-semibold rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#48007e] text-white font-semibold rounded-lg hover:bg-[#7c01cd] transition"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
