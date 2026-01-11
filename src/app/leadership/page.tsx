"use client";

import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

interface Leader {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
}

export default function LeadershipPage() {
  const [expandedLeader, setExpandedLeader] = useState<string | null>(null);

  const leadership: Leader[] = [
    {
      _id: "leader-1",
      name: "Pastor John Smith",
      role: "Senior Pastor",
      bio: "With over 20 years of ministry experience, Pastor John leads our church with a heart for discipleship and community transformation. His vision is to see believers grow in faith and impact their communities with the Gospel.",
      image: "/bib-4.jpg",
      email: "john@tcbc.church",
      phone: "(555) 123-4567",
    },
    {
      _id: "leader-2",
      name: "Pastor Sarah Johnson",
      role: "Associate Pastor",
      bio: "Passionate about women's ministry and spiritual development, Pastor Sarah brings warmth and wisdom to our leadership team. She specializes in discipleship and helps believers discover their calling in Christ.",
      image: "/bible-1.jpg",
      email: "sarah@tcbc.church",
      phone: "(555) 123-4568",
    },
    {
      _id: "leader-3",
      name: "Michael Chen",
      role: "Worship Director",
      bio: "Leading our worship with creativity and authenticity, Michael creates an atmosphere where people encounter God's presence. His passion is to help the congregation experience transformative worship experiences.",
      image: "/bible-2.jpg",
      email: "michael@tcbc.church",
      phone: "(555) 123-4569",
    },
    {
      _id: "leader-4",
      name: "David Martinez",
      role: "Youth Pastor",
      bio: "Dedicated to empowering the next generation, David creates meaningful experiences that help young people grow in faith. He believes in investing in youth and developing future leaders for the church.",
      image: "/bib-4.jpg",
      email: "david@tcbc.church",
      phone: "(555) 123-4570",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-center bg-cover overflow-hidden" style={{ backgroundImage: "url('/bib-4.jpg')" }}>
        <div className="absolute inset-0 bg-[#48007e]/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-satoshi text-5xl md:text-6xl font-bold mb-6">
            Our Leadership Team
          </h1>

          <p className="font-aeonik text-xl max-w-3xl mx-auto mb-8">
            Dedicated servants leading with vision, integrity, and a heart for ministry.
          </p>

          <div className="w-24 h-1 mx-auto bg-white"></div>
        </div>
      </section>

      {/* Leadership Grid Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                <h3 className="font-satoshi text-lg font-bold text-[#48007e] mb-1">
                  {leader.name}
                </h3>
                
                <p className="font-aeonik text-xs font-semibold text-[#7c01cd] mb-3">
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
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#48007e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-satoshi text-4xl font-bold text-white mb-4">
              Leadership Values
            </h2>
            <p className="font-aeonik text-lg text-gray-100 max-w-2xl mx-auto">
              These principles guide our leadership and ministry decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Integrity",
                description: "Leading with honesty, transparency, and biblical principles in all we do.",
              },
              {
                title: "Servant Heart",
                description: "Putting the needs of others first and serving with humility and compassion.",
              },
              {
                title: "Vision",
                description: "Casting a clear vision for spiritual growth and community transformation.",
              },
              {
                title: "Accountability",
                description: "Being responsible to God and our congregation for our leadership and decisions.",
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white/10 rounded-xl p-8 text-white backdrop-blur-sm">
                <h3 className="font-satoshi text-xl font-bold mb-3">
                  {value.title}
                </h3>
                <p className="font-aeonik text-gray-100 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
