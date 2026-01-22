"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MapPin, Clock, X } from "lucide-react";
import Footer from "@/components/Footer";
import ChurchCalendar from "@/components/ChurchCalendar";
import { dummyEvents, dummyMinistries } from "@/lib/dummyData";
import { USE_DUMMY_DATA } from "@/lib/config";

interface SanityEvent {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  category: string;
  description: string;
  ministry?: string;
}

interface CalendarEvent {
  _id: string;
  title: string;
  date: number; // day of month
  startDate: string;
  location: string;
  category: string;
  description: string;
  ministry?: string;
}

function EventsContent() {
  const searchParams = useSearchParams();
  const ministryFilter = searchParams.get("ministry");
  
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0)); // January 2026
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDay, setSelectedDay] = useState<{ day: number; events: CalendarEvent[] } | null>(null);
  const [filterDate, setFilterDate] = useState<string>("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Build API URL with ministry filter if present
        const apiUrl = ministryFilter 
          ? `/api/events?ministry=${encodeURIComponent(ministryFilter)}`
          : "/api/events";
          
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        
        const transformed = (data || []).map((event: any) => ({
          _id: event._id,
          title: event.title,
          date: new Date(event.startDate).getDate(),
          startDate: event.startDate,
          location: event.location,
          category: event.category,
          description: event.description,
          ministry: event.ministry?.title || event.ministry,
        }));
        
        setEvents(transformed);
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [ministryFilter]);

  const categoryColors: { [key: string]: string } = {
    worship: "bg-[#48007e]",
    study: "bg-[#7c01cd]",
    youth: "bg-blue-600",
    community: "bg-green-600",
    service: "bg-green-600",
    prayer: "bg-amber-600",
  };

  const categories = Array.from(new Set(events.map((e) => e.category)));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDay = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    let dayEvents = events.filter((e) => {
      const eventDate = new Date(e.startDate);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
    
    // Apply date filter if set
    if (filterDate) {
      const selectedDate = new Date(filterDate);
      
      // Only show events on the selected date
      if (targetDate.toDateString() !== selectedDate.toDateString()) {
        dayEvents = [];
      }
    }
    
    return dayEvents;
  };

  const clearDateFilter = () => {
    setFilterDate("");
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  // Update month display based on date filter
  let displayDate = currentDate;
  if (filterDate) {
    const selected = new Date(filterDate);
    displayDate = new Date(selected.getFullYear(), selected.getMonth());
  }
  
  const monthName = displayDate.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative py-16 sm:py-24 bg-center bg-cover"
        style={{ backgroundImage: "url('/bib-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#48007e]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Events Calendar
          </h1>

          <p className="font-aeonik text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">
            Stay connected with our church events and activities.
          </p>

          <div className="w-20 sm:w-24 h-1 mx-auto bg-white" />
        </div>
      </section>

      {/* Merged Calendar with Service Times and Events */}
      <ChurchCalendar />

      <Footer />
    </main>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EventsContent />
    </Suspense>
  );
}
