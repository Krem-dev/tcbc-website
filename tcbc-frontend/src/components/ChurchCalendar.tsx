"use client";

import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

const ChurchCalendar: React.FC = () => {
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "10:00 AM - 11:30 AM",
      location: "Main Sanctuary",
      description: "Join us for inspiring worship, powerful messages, and meaningful fellowship.",
    },
    {
      id: 2,
      title: "Midweek Bible Study",
      date: "Every Wednesday",
      time: "7:00 PM - 8:30 PM",
      location: "Fellowship Hall",
      description: "Dive deeper into God's Word with interactive study sessions and discussion.",
    },
    {
      id: 3,
      title: "Prayer Meeting",
      date: "Every Friday",
      time: "6:00 PM - 7:00 PM",
      location: "Prayer Room",
      description: "Come together to pray for our church, community, and world.",
    },
    {
      id: 4,
      title: "Youth Group",
      date: "Every Saturday",
      time: "6:00 PM - 8:00 PM",
      location: "Youth Center",
      description: "Fellowship, games, and spiritual growth for young adults.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-satoshi mb-4 text-4xl font-bold text-[#48007e] lg:text-5xl">
            Church <span className="text-[#7c01cd]">Calendar</span>
          </h2>
          <p className="font-aeonik mx-auto max-w-3xl text-lg text-gray-600">
            Join us for worship, fellowship, and spiritual growth. Find the perfect event to connect with our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-[#7c01cd] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#48007e]">{event.title}</h3>
                <Calendar className="w-5 h-5 text-[#7c01cd]" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 text-[#7c01cd]" />
                  <span className="text-sm font-medium">{event.date}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-4 h-4 text-[#7c01cd]" />
                  <span className="text-sm font-medium">{event.time}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4 text-[#7c01cd]" />
                  <span className="text-sm font-medium">{event.location}</span>
                </div>
              </div>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChurchCalendar;
