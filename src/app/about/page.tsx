"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [allowMotion, setAllowMotion] = useState(true);
  const [activeTab, setActiveTab] = useState("mission");
  const [leadershipCategory, setLeadershipCategory] = useState("board");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const timeline = [
    {
      year: "Early 2024",
      title: "Foundation in Prayer",
      description: "Nearly one year of intense fasting, prayer, and consecration. A small group of believers sought God for direction, and God revealed the vision and identity of the ministry.",
      milestone: "Spiritual Preparation",
    },
    {
      year: "Mid-2024",
      title: "Identity Revealed",
      description: "God impressed the name The Chosen Bible Church, inspired by 1 Peter 2:9. Clear calling to raise believers who know their identity in Christ.",
      milestone: "Name & Scriptural Mandate",
    },
    {
      year: "December 1, 2024",
      title: "Official Launch",
      description: "TCBC officially launched with first worship location secured at Gloucester South Senior Centre. Venue provided at minimal cost, with services initially held in the evenings.",
      milestone: "Church Begins",
    },
    {
      year: "January 5, 2025",
      title: "First Sunday Morning Service",
      description: "First Sunday morning service held, marking consistency, deeper ministry impact, and growing attendance.",
      milestone: "New Phase of Growth",
    },
    {
      year: "Dec 2024 – June 29, 2025",
      title: "Season of Establishment",
      description: "Gloucester South Senior Centre served as place of worship, fellowship, and spiritual empowerment. Church community grew in unity and vision.",
      milestone: "Strengthening the Church",
    },
    {
      year: "Mid-2025",
      title: "Relocation & Expansion",
      description: "God opened the door to a new property. TCBC secured 2350 Stevenage Drive. Transition marked divine timing and expansion.",
      milestone: "New Worship Location",
    },
    {
      year: "Future",
      title: "Building a Lasting Legacy",
      description: "Vision to acquire land and build a permanent sanctuary. A legacy space for worship, discipleship, and generations to come.",
      milestone: "Looking Ahead",
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
      _id: "board-1",
      name: "Board Member 1",
      role: "Board of Directors",
      category: "board",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "board-2",
      name: "Board Member 2",
      role: "Board of Directors",
      category: "board",
      image: "/bible-1.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "board-3",
      name: "Board Member 3",
      role: "Board of Directors",
      category: "board",
      image: "/bible-2.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "board-4",
      name: "Board Member 4",
      role: "Board of Directors",
      category: "board",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "board-5",
      name: "Board Member 5",
      role: "Board of Directors",
      category: "board",
      image: "/bible-1.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-1",
      name: "Council Leader 1",
      role: "Council Member",
      category: "council",
      image: "/bible-2.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-2",
      name: "Council Leader 2",
      role: "Council Member",
      category: "council",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-3",
      name: "Council Leader 3",
      role: "Council Member",
      category: "council",
      image: "/bible-1.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-4",
      name: "Council Leader 4",
      role: "Council Member",
      category: "council",
      image: "/bible-2.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-5",
      name: "Council Leader 5",
      role: "Council Member",
      category: "council",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-6",
      name: "Council Leader 6",
      role: "Council Member",
      category: "council",
      image: "/bible-1.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-7",
      name: "Council Leader 7",
      role: "Council Member",
      category: "council",
      image: "/bible-2.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-8",
      name: "Council Leader 8",
      role: "Council Member",
      category: "council",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-9",
      name: "Council Leader 9",
      role: "Council Member",
      category: "council",
      image: "/bible-1.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-10",
      name: "Council Leader 10",
      role: "Council Member",
      category: "council",
      image: "/bible-2.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-11",
      name: "Council Leader 11",
      role: "Council Member",
      category: "council",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-12",
      name: "Council Leader 12",
      role: "Council Member",
      category: "council",
      image: "/bible-1.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-13",
      name: "Council Leader 13",
      role: "Council Member",
      category: "council",
      image: "/bible-2.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-14",
      name: "Council Leader 14",
      role: "Council Member",
      category: "council",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-15",
      name: "Council Leader 15",
      role: "Council Member",
      category: "council",
      image: "/bible-1.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-16",
      name: "Council Leader 16",
      role: "Council Member",
      category: "council",
      image: "/bible-2.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-17",
      name: "Council Leader 17",
      role: "Council Member",
      category: "council",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-18",
      name: "Council Leader 18",
      role: "Council Member",
      category: "council",
      image: "/bible-1.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "council-19",
      name: "Council Leader 19",
      role: "Council Member",
      category: "council",
      image: "/bible-2.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "exec-1",
      name: "Executive Member 1",
      role: "Executive",
      category: "executive",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "exec-2",
      name: "Executive Member 2",
      role: "Executive",
      category: "executive",
      image: "/bible-1.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "exec-3",
      name: "Executive Member 3",
      role: "Executive",
      category: "executive",
      image: "/bible-2.jpg",
      email: "",
      phone: "",
    },
    {
      _id: "exec-4",
      name: "Executive Member 4",
      role: "Executive",
      category: "executive",
      image: "/bib-4.jpg",
      email: "",
      phone: "",
    },
  ];

  const tabs = [
    { id: "mission", label: "Mission & Vision" },
    { id: "history", label: "Our History" },
    { id: "journey", label: "Our Journey" },
    { id: "leadership", label: "Leadership" },
  ];

  const leadershipTabs = [
    { id: "board", label: "Board of Directors (5)" },
    { id: "executive", label: "Executive (4)" },
    { id: "council", label: "Council Leaders (19)" },
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
                      &ldquo;To bring people into a transforming relationship with Jesus Christ and to equip them for impactful Christian living.&rdquo;
                    </blockquote>
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
                      &ldquo;To be a beacon of hope and love, uniting people from all nations and generations to serve Ottawa and beyond.&rdquo;
                    </blockquote>
                    <div className="space-y-4 pt-4">
                      <p className="font-aeonik text-gray-700 leading-relaxed">
                        Beyond transforming lives in the present, the church carries a forward-looking vision: to acquire land and build a beautiful sanctuary, a lasting legacy for generations yet to come. This future home will be a place where children, youth, adults, and families can worship God, grow in His Word, and continue the mission entrusted to us to go into the world to make disciples of all nations.
                      </p>
                      <p className="font-aeonik text-gray-700 leading-relaxed">
                        Today, The Chosen Bible Church stands as a testimony that what begins in prayer is sustained by God's power. From humble beginnings, God is raising a vibrant church that shines His light, nurtures His people, and advances His Kingdom in Ottawa and to the nations.
                      </p>
                    </div>
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

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="space-y-8 sm:space-y-12">
              <div className="text-center">
                <h2 className="font-satoshi mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#48007e]">
                  History of The Chosen Bible Church
                </h2>
                <p className="font-aeonik text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  A testimony of God's faithfulness, prayer, obedience, and divine orchestration.
                </p>
              </div>

              {/* Main History Content */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 sm:p-12 border border-gray-200">
                <div className="prose prose-lg max-w-none font-aeonik text-gray-700 leading-relaxed space-y-6">
                  <p>
                    The story of The Chosen Bible Church is a testimony of God's faithfulness, prayer, obedience, and divine orchestration. Though the ministry officially began on December 1st, 2024, its foundation was laid through nearly a year of intense fasting, prayer, and spiritual preparation. A small group of devoted brethren sought the Lord earnestly, believing that God desired to birth a new work in the city of Ottawa. In those months of consecration, the Lord refined their hearts, strengthened their faith, and revealed His purpose.
                  </p>

                  <p>
                    During these prayer seasons, God impressed upon the leadership a name that would define the identity and destiny of the ministry: <strong className="text-[#48007e]">The Chosen Bible Church</strong>. The name was inspired by 1 Peter 2:9, which declares, <em>"But you are a chosen generation, a royal priesthood, a holy nation, a peculiar people…"</em> This verse captured the calling to raise a people who know who they are in Christ, walk in His light, and proclaim His praises to the nations.
                  </p>

                  <p>
                    When the church launched on December 1st, 2024, the Lord confirmed His hand upon the work by granting the ministry its first worship location at the Gloucester South Senior Centre. This provision was a miracle in itself, the church was able to meet there for a very small cost, easing the financial burden in its infancy. In its first month, the church held its services in the evenings, building momentum and community. Then, on January 5th, 2025, The Chosen Bible Church held its first Sunday morning service, marking the beginning of a new chapter of growth, consistency, and deeper ministry impact.
                  </p>

                  <p>
                    From December 1, 2024, to June 29, 2025, the Senior Centre served as a place of worship, fellowship, and spiritual empowerment. By divine arrangement, God opened a door to a new worship location. The leadership successfully secured the property at <strong className="text-[#48007e]">2350 Stevenage Drive</strong>, where the congregation now worships. The timing of this transition testified to the grace and precision with which God guides His church.
                  </p>

                  <p>
                    From its earliest days, The Chosen Bible Church has embraced the calling to become a multinational, multigenerational, and multicultural community of believers. The heart of the ministry is to create a spiritual home where people from every background can encounter God, grow in faith, and discover their purpose.
                  </p>
                </div>


                {/* Future Vision */}
                <div className="mt-8 bg-gradient-to-r from-[#48007e]/5 to-[#7c01cd]/5 rounded-2xl p-8 border border-[#48007e]/10">
                  <h4 className="font-satoshi text-xl font-bold text-[#48007e] mb-4">
                    Looking Ahead
                  </h4>
                  <p className="font-aeonik text-gray-700 leading-relaxed">
                    Beyond transforming lives in the present, the church carries a forward-looking vision: to acquire land and build a beautiful sanctuary, a lasting legacy for generations yet to come. This future home will be a place where children, youth, adults, and families can worship God, grow in His Word, and continue the mission entrusted to us to go into the world to make disciples of all nations.
                  </p>
                  <p className="font-aeonik text-gray-700 leading-relaxed mt-4">
                    Today, The Chosen Bible Church stands as a testimony that what begins in prayer is sustained by God's power. From humble beginnings, God is raising a vibrant church that shines His light, nurtures His people, and advances His Kingdom in Ottawa and to the nations.
                  </p>
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
                            <div className="w-20 h-20 bg-[#48007e] rounded-full flex items-center justify-center p-2">
                              <span className="font-satoshi text-white font-bold text-xs text-center leading-tight">
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

              <div className="mb-8 flex flex-wrap gap-3 justify-center">
                {leadershipTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setLeadershipCategory(tab.id)}
                    className={`px-6 py-2 rounded-full font-aeonik font-semibold transition-colors ${
                      leadershipCategory === tab.id
                        ? "bg-[#48007e] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {leadership
                  .filter((leader) => leader.category === leadershipCategory)
                  .map((leader) => (
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
