"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MapPin, Clock, X } from "lucide-react";
import Footer from "@/components/Footer";
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
  const [filterDate, setFilterDate] = useState<string>("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Always use dummy data for now (will switch to Sanity when credentials are added)
        let transformed = dummyEvents.map((event) => ({
          _id: event._id,
          title: event.title,
          date: new Date(event.startDate).getDate(),
          startDate: event.startDate,
          location: event.location,
          category: event.category,
          description: event.description,
          ministry: event.ministry,
        }));
        
        // Filter by ministry if query parameter exists
        if (ministryFilter) {
          transformed = transformed.filter((event) => event.ministry === ministryFilter);
        }
        
        setEvents(transformed);
      } catch (error) {
        console.error("Failed to load events:", error);
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
    let dayEvents = events.filter((e) => e.date === day);
    
    // Apply date filter if set
    if (filterDate) {
      const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const selectedDate = new Date(filterDate);
      
      // Only show events on the selected date
      if (eventDate.toDateString() !== selectedDate.toDateString()) {
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

      {/* Calendar Section */}
      <section className="py-12 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#48007e] mx-auto mb-4"></div>
                <p className="text-gray-600 font-aeonik">Loading events...</p>
              </div>
            </div>
          ) : (
            <>
          {/* Controls */}
          <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Month Navigation */}
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4">
              <button onClick={previousMonth} className="p-1 sm:p-2 hover:bg-white rounded-lg transition">
                <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 text-[#48007e]" />
              </button>
              <h2 className="font-satoshi text-xl sm:text-2xl md:text-3xl font-bold text-[#48007e] min-w-40 sm:min-w-48 text-center">
                {monthName}
              </h2>
              <button onClick={nextMonth} className="p-1 sm:p-2 hover:bg-white rounded-lg transition">
                <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-[#48007e]" />
              </button>
            </div>

            {/* Date Filter and Clear Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              <label className="font-aeonik text-xs sm:text-sm text-gray-700 font-semibold">Filter by Date:</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg font-aeonik text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#48007e]"
              />
              {filterDate && (
                <button
                  onClick={clearDateFilter}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Clear
                </button>
              )}

              {/* Clear Ministry Filter */}
              {ministryFilter && (
                <a
                  href="/events"
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#48007e] border-2 border-[#48007e] hover:bg-[#48007e] hover:text-white rounded-lg transition"
                >
                  Clear Filter
                </a>
              )}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b-2 border-gray-200 bg-gray-50">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 sm:p-3 text-center font-satoshi font-semibold text-gray-700 text-xs sm:text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {/* Empty cells */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-gray-50 h-20 sm:h-28 md:h-32 border-r border-b border-gray-200" />
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                
                return (
                  <div 
                    key={day} 
                    className="h-20 sm:h-28 md:h-32 p-1.5 sm:p-2 md:p-3 border-r border-b border-gray-200 hover:bg-gray-50 transition-colors flex flex-col"
                  >
                    <div className="font-satoshi font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                      {day}
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-0.5 sm:space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <button
                          key={event._id}
                          onClick={() => setSelectedEvent(event)}
                          className={`${categoryColors[event.category]} text-white text-xs sm:text-sm px-1.5 sm:px-2 py-1 sm:py-1.5 rounded font-medium w-full text-left hover:opacity-90 transition leading-tight`}
                          title={event.title}
                        >
                          <span className="line-clamp-2 sm:line-clamp-1">
                            {event.title}
                          </span>
                        </button>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 text-center py-1">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                      {dayEvents.length === 0 && (
                        <div className="text-xs text-gray-400 italic text-center hidden sm:block">
                          No events
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            </>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-satoshi text-2xl sm:text-3xl font-bold text-gray-800 flex-1 pr-4">
                {selectedEvent.title}
              </h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Category Badge */}
            <span className={`${categoryColors[selectedEvent.category]} text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-6 capitalize`}>
              {selectedEvent.category}
            </span>

            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#48007e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-aeonik text-sm text-gray-600 mb-1">Time</p>
                  <p className="font-satoshi font-semibold text-gray-800">
                    {new Date(selectedEvent.startDate).toLocaleDateString()} at{' '}
                    {new Date(selectedEvent.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#48007e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-aeonik text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-satoshi font-semibold text-gray-800">{selectedEvent.location}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="font-aeonik text-sm text-gray-600 mb-2">Description</p>
              <p className="font-aeonik text-gray-700 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-3 bg-[#48007e] text-white font-semibold rounded-lg hover:bg-[#7c01cd] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
