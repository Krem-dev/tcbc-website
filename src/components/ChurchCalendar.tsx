"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

type ServiceTime = {
  day: string;
  time: string;
  service: string;
};

type SanityEvent = {
  _id: string;
  title: string;
  startDate: string;
  location: string;
  description: string;
  ministry?: string;
  category?: string;
};

type CalendarDay = {
  date: number;
  isCurrentMonth: boolean;
  services: ServiceTime[];
  events: SanityEvent[];
};

interface ChurchCalendarProps {
  ministryFilter?: string;
}

const ChurchCalendar: React.FC<ChurchCalendarProps> = ({ ministryFilter }) => {
  const [serviceTimes, setServiceTimes] = useState<ServiceTime[]>([]);
  const [events, setEvents] = useState<SanityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null);

  const dayMap: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homepageRes, eventsRes] = await Promise.all([
          fetch("/api/homepage"),
          fetch("/api/events")
        ]);

        if (homepageRes.ok) {
          const data = await homepageRes.json();
          const times = data?.serviceTimesSection?.serviceTimes || [];
          setServiceTimes(times);
        }

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: CalendarDay[] = [];

    for (let i = startingDayOfWeek; i > 0; i--) {
      days.push({
        date: new Date(year, month, -i + 1).getDate(),
        isCurrentMonth: false,
        services: [],
        events: [],
      });
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const dayOfWeek = new Date(year, month, date).getDay();
      const dayName = Object.keys(dayMap).find((key) => dayMap[key] === dayOfWeek);

      const dayServices = serviceTimes.filter(
        (service) => service.day === dayName
      );

      const currentDateObj = new Date(year, month, date);
      let dayEvents = events.filter((event) => {
        const eventDate = new Date(event.startDate);
        return (
          eventDate.getDate() === date &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });

      if (ministryFilter) {
        dayEvents = dayEvents.filter((event) => event.ministry === ministryFilter);
      }

      days.push({
        date,
        isCurrentMonth: true,
        services: dayServices,
        events: dayEvents,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        services: [],
        events: [],
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading calendar...</p>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-[#48007e]" />
              </button>
              <h3 className="text-2xl font-bold text-[#48007e]">{monthName}</h3>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-[#48007e]" />
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-7 bg-[#48007e] text-white">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-4 text-center font-semibold">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-32 p-3 border border-gray-200 ${
                      !day.isCurrentMonth ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-2 ${
                      day.isCurrentMonth ? "text-[#48007e]" : "text-gray-400"
                    }`}>
                      {day.date}
                    </div>
                    <div className="space-y-1 text-xs overflow-y-auto max-h-24">
                      {day.services.map((service, idx) => (
                        <div
                          key={`service-${idx}`}
                          className="bg-[#7c01cd]/10 text-[#48007e] p-1.5 rounded border-l-2 border-[#7c01cd]"
                        >
                          <div className="font-semibold truncate">{service.service}</div>
                          <div className="text-[10px] text-gray-600">{service.time}</div>
                        </div>
                      ))}
                      {day.events.slice(0, 2).map((event, idx) => (
                        <button
                          key={`event-${idx}`}
                          onClick={() => setSelectedEvent(event)}
                          className="w-full bg-blue-100 text-blue-800 p-1.5 rounded border-l-2 border-blue-500 hover:bg-blue-200 transition text-left"
                        >
                          <div className="font-semibold truncate">{event.title}</div>
                          <div className="text-[10px] text-blue-600">{event.location}</div>
                        </button>
                      ))}
                      {day.events.length > 2 && (
                        <button
                          onClick={() => setSelectedEvent(day.events[0])}
                          className="w-full text-xs text-blue-600 hover:text-blue-800 py-1 text-center"
                        >
                          +{day.events.length - 2} more
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

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
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-satoshi text-2xl sm:text-3xl font-bold text-gray-800 flex-1 pr-4">
                {selectedEvent.title}
              </h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {selectedEvent.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-6 capitalize">
                {selectedEvent.category}
              </span>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-aeonik text-sm text-gray-600 mb-1">Date & Time</p>
                <p className="font-satoshi font-semibold text-gray-800">
                  {new Date(selectedEvent.startDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at{' '}
                  {new Date(selectedEvent.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div>
                <p className="font-aeonik text-sm text-gray-600 mb-1">Location</p>
                <p className="font-satoshi font-semibold text-gray-800">{selectedEvent.location}</p>
              </div>
            </div>

            {selectedEvent.description && (
              <div className="mb-6">
                <p className="font-aeonik text-sm text-gray-600 mb-2">Description</p>
                <p className="font-aeonik text-gray-700 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
            )}

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-3 bg-[#48007e] text-white font-semibold rounded-lg hover:bg-[#7c01cd] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChurchCalendar;
