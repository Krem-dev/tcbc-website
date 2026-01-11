"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [allowMotion, setAllowMotion] = useState(true);
  const [activeTab, setActiveTab] = useState("mission");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const timeline = [
    {
      year: "2020",
      title: "Church Founded",
      description: "The Chosen Bible Church was established with a vision to build a community of faith, hope, and love.",
      milestone: "Vision established",
    },
    {
      year: "2022",
      title: "Community Growth",
      description: "Expanded ministry programs and established multiple service locations across the city.",
      milestone: "Community expansion",
    },
    {
      year: "2024",
      title: "Digital Ministry Launch",
      description: "Launched online services and digital platforms to reach a broader audience.",
      milestone: "Digital transformation",
    },
  ];

  const coreValues = [
    {
      value: "Faith First",
      description: "Rooted in biblical truth and committed to spiritual growth for all believers.",
    },
    {
      value: "Community Care",
      description: "Building meaningful relationships and supporting one another through life's journey.",
    },
    {
      value: "Servant Heart",
      description: "Serving others with compassion and dedication to our community and beyond.",
    },
    {
      value: "Continuous Growth",
      description: "Committed to spiritual and personal development for all members.",
    },
    {
      value: "Gospel Centered",
      description: "Everything we do is centered on the message and mission of Jesus Christ.",
    },
  ];

  const leadership = [
    {
      _id: "leader-1",
      name: "Pastor John Smith",
      role: "Senior Pastor",
      image: "/bib-4.jpg",
      email: "john@tcbc.church",
      phone: "(555) 123-4567",
    },
    {
      _id: "leader-2",
      name: "Pastor Sarah Johnson",
      role: "Associate Pastor",
      image: "/bible-1.jpg",
      email: "sarah@tcbc.church",
      phone: "(555) 123-4568",
    },
    {
      _id: "leader-3",
      name: "Michael Chen",
      role: "Worship Director",
      image: "/bible-2.jpg",
      email: "michael@tcbc.church",
      phone: "(555) 123-4569",
    },
    {
      _id: "leader-4",
      name: "David Martinez",
      role: "Youth Pastor",
      image: "/bib-4.jpg",
      email: "david@tcbc.church",
      phone: "(555) 123-4570",
    },
    {
      _id: "leader-5",
      name: "Rebecca Williams",
      role: "Children's Ministry Director",
      image: "/bible-1.jpg",
      email: "rebecca@tcbc.church",
      phone: "(555) 123-4571",
    },
    {
      _id: "leader-6",
      name: "James Thompson",
      role: "Missions Director",
      image: "/bible-2.jpg",
      email: "james@tcbc.church",
      phone: "(555) 123-4572",
    },
  ];

  const tabs = [
    { id: "mission", label: "Our Mission" },
    { id: "journey", label: "Our Journey" },
    { id: "leadership", label: "Leadership" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* About Hero Section */}
      <section className="relative py-16 sm:py-24 bg-center bg-cover overflow-hidden" style={{ backgroundImage: "url('/bib-4.jpg')" }}>
        <div className="absolute inset-0 bg-[#48007e]/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            About The Chosen Bible Church
          </h1>

          <p className="font-aeonik text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">
            A community of faith, hope, and love. Founded on biblical principles and committed to spiritual growth, meaningful fellowship, and community service.
          </p>

          <div className="w-20 sm:w-24 h-1 mx-auto bg-white"></div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center mb-6 sm:mb-8 gap-2 sm:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#48007e] text-white shadow-lg border-transparent"
                    : "bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-100 hover:border-gray-400 hover:shadow-md"
                }`}
              >
                <span className="font-aeonik">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Tab */}
          {activeTab === "mission" && (
            <div className="space-y-8 sm:space-y-12">
              <div className="text-center">
                <h2 className="font-satoshi mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#48007e]">
                  Who We Are
                </h2>
                <p className="font-aeonik text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  The Chosen Bible Church is a mission-driven faith community committed to transforming lives through the Gospel of Jesus Christ. Grounded in Scripture, equity, and community engagement, we equip believers with biblical truth and empower them to live out their faith in meaningful ways.
                </p>
              </div>

              {/* Statement of Faith - Mission, Vision & Faith */}
              <div className="space-y-8 sm:space-y-12">
                {/* Mission & Vision - Two Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Mission */}
                  <div className="space-y-4">
                    <div className="inline-block px-4 py-2 bg-[#48007e]/10 rounded-full">
                      <p className="font-aeonik text-xs font-bold uppercase tracking-widest text-[#48007e]">
                        Our Purpose
                      </p>
                    </div>
                    <h3 className="font-satoshi text-3xl font-bold text-[#48007e]">
                      Our Mission
                    </h3>
                    <blockquote className="text-xl font-aeonik text-[#48007e] italic leading-relaxed pt-2">
                      &ldquo;To glorify God by making disciples of Jesus Christ who are transformed by His Word, empowered by His Spirit, and engaged in His mission.&rdquo;
                    </blockquote>
                    <p className="font-aeonik text-gray-600 leading-relaxed pt-2">
                      We exist to proclaim the Gospel, build a community of believers, serve our neighbors with compassion, and equip people for effective ministry.
                    </p>
                  </div>

                  {/* Vision */}
                  <div className="space-y-4">
                    <div className="inline-block px-4 py-2 bg-[#7c01cd]/10 rounded-full">
                      <p className="font-aeonik text-xs font-bold uppercase tracking-widest text-[#7c01cd]">
                        Our Future
                      </p>
                    </div>
                    <h3 className="font-satoshi text-3xl font-bold text-[#48007e]">
                      Our Vision
                    </h3>
                    <blockquote className="text-xl font-aeonik text-[#48007e] italic leading-relaxed pt-2">
                      &ldquo;A thriving community of believers who live out their faith boldly, impact their neighborhoods with Christ's love, and multiply disciples across generations.&rdquo;
                    </blockquote>
                    <p className="font-aeonik text-gray-600 leading-relaxed pt-2">
                      We envision a church where every member discovers their purpose, develops their gifts, and demonstrates the transformative power of the Gospel in their daily lives.
                    </p>
                  </div>
                </div>

                {/* Statement of Faith */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-200">
                  <div className="mb-8">
                    <div className="inline-block px-4 py-2 bg-[#48007e]/10 rounded-full mb-4">
                      <p className="font-aeonik text-xs font-bold uppercase tracking-widest text-[#48007e]">
                        What We Believe
                      </p>
                    </div>
                    <h3 className="font-satoshi text-3xl font-bold text-[#48007e]">
                      Our Statement of Faith
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 font-aeonik text-gray-700 leading-relaxed">
                    <div className="space-y-4">
                      <div>
                        <p className="font-bold text-[#48007e] mb-1">The Trinity</p>
                        <p className="text-sm">We believe in the one true God eternally existing in three persons: Father, Son, and Holy Spirit, worthy of all worship, adoration, and service.</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#48007e] mb-1">The Authority of Scripture</p>
                        <p className="text-sm">We believe the Bible is God's Word, fully inspired, infallible, and authoritative in all matters of faith and practice.</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#48007e] mb-1">Jesus Christ</p>
                        <p className="text-sm">We believe in Jesus Christ, God's Son, who was born of a virgin, lived a sinless life, died for our sins, rose from the dead, and ascended to heaven.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="font-bold text-[#48007e] mb-1">Salvation by Grace</p>
                        <p className="text-sm">We believe salvation comes through faith in Jesus Christ alone, by grace through faith, not by works or human effort.</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#48007e] mb-1">The Holy Spirit</p>
                        <p className="text-sm">We believe in the power of the Holy Spirit to transform lives, empower believers, and guide the church in fulfilling God's mission.</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#48007e] mb-1">The Church</p>
                        <p className="text-sm">We believe in the church as Christ's body, called to worship, fellowship, discipleship, and service in the world.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Values Section */}
              <div>
                <h2 className="font-satoshi text-3xl font-bold text-[#48007e] mb-6">
                  Our Core Values
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      value: "Faith First",
                      description: "Rooted in biblical truth and committed to spiritual growth.",
                    },
                    {
                      value: "Community Care",
                      description: "Building meaningful relationships and supporting one another.",
                    },
                    {
                      value: "Servant Heart",
                      description: "Serving others with compassion and dedication.",
                    },
                    {
                      value: "Gospel Centered",
                      description: "Everything we do reflects the message of Jesus Christ.",
                    },
                    {
                      value: "Continuous Growth",
                      description: "Committed to spiritual and personal development.",
                    },
                    {
                      value: "Local Empowerment",
                      description: "Strengthening our community through faith and service.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                      <div className="w-2 h-2 bg-[#48007e] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-satoshi font-bold text-[#48007e]">
                          {item.value}:
                        </span>
                        <span className="font-aeonik text-gray-600 ml-2 text-sm">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Journey Tab */}
          {activeTab === "journey" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="font-satoshi mb-4 text-4xl font-bold text-[#48007e] lg:text-5xl">
                  Our Journey
                </h2>
                <p className="font-aeonik text-lg text-gray-600 max-w-2xl mx-auto">
                  From vision to impact - the story of The Chosen Bible Church's growth and ministry.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300 hidden lg:block"></div>

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`lg:w-1/2 ${
                          index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                        }`}
                      >
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-[#48007e] rounded-full flex items-center justify-center">
                              <span className="font-satoshi text-white font-bold text-lg">
                                {item.year}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-satoshi text-xl font-bold text-[#48007e]">
                                {item.title}
                              </h4>
                              <div className="inline-flex items-center px-3 py-1 bg-[#7c01cd]/15 rounded-full border border-[#48007e]/10">
                                <span className="font-aeonik text-sm text-[#48007e] font-medium">
                                  {item.milestone}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="font-aeonik text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="hidden lg:block w-4 h-4 bg-[#7c01cd] rounded-full border-4 border-white shadow-lg z-10"></div>

                      <div className="lg:w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Leadership Tab */}
          {activeTab === "leadership" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="font-satoshi mb-4 text-4xl font-bold text-[#48007e] lg:text-5xl">
                  Our Leadership Team
                </h2>
                <p className="font-aeonik text-lg text-gray-600 max-w-2xl mx-auto">
                  Dedicated servants leading with vision, integrity, and a heart for ministry.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {leadership.map((leader) => (
                  <div
                    key={leader._id}
                    className="text-center"
                  >
                    {/* Circular Image */}
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-4 border-[#48007e]/10">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="font-satoshi text-sm font-bold text-[#48007e] mb-1">
                      {leader.name}
                    </h3>
                    
                    <p className="font-aeonik text-xs font-semibold text-[#7c01cd] mb-2">
                      {leader.role}
                    </p>

                    <div className="space-y-1">
                      {leader.email && (
                        <a
                          href={`mailto:${leader.email}`}
                          className="block font-aeonik text-xs text-gray-600 hover:text-[#48007e] transition-colors"
                        >
                          {leader.email}
                        </a>
                      )}
                      {leader.phone && (
                        <a
                          href={`tel:${leader.phone}`}
                          className="block font-aeonik text-xs text-gray-600 hover:text-[#48007e] transition-colors"
                        >
                          {leader.phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
