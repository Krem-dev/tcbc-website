"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import EventDetailModal from "@/components/EventDetailModal";

type ServiceTime = {
  day: string;
  time: string;
  service: string;
};

type SanityEvent = {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  ministry?: string;
  category?: string;
  image?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
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

  const today = new Date();
  const isToday = (dayNum: number) =>
    currentDate.getFullYear() === today.getFullYear() &&
    currentDate.getMonth() === today.getMonth() &&
    dayNum === today.getDate();

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading calendar...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Month navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
              <h3 className="text-xl font-semibold text-gray-900">{monthName}</h3>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-gray-100">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const hasContent = day.services.length > 0 || day.events.length > 0;
                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2.5 border-b border-r border-gray-100 [&:nth-child(7n)]:border-r-0 ${
                      !day.isCurrentMonth ? "bg-gray-50/60" : "bg-white"
                    }`}
                  >
                    <div className={`text-sm mb-2 ${
                      isToday(day.date) && day.isCurrentMonth
                        ? "w-7 h-7 rounded-full bg-[#48007e] text-white flex items-center justify-center font-semibold"
                        : day.isCurrentMonth
                          ? "font-medium text-gray-800"
                          : "text-gray-300"
                    }`}>
                      {day.date}
                    </div>
                    <div className="space-y-1 text-xs overflow-y-auto max-h-[80px]">
                      {day.services.map((service, idx) => (
                        <div
                          key={`service-${idx}`}
                          className="px-2 py-1 rounded-md bg-gray-100 text-gray-600"
                        >
                          <div className="font-medium text-gray-800 truncate">{service.service}</div>
                          <div className="text-[10px] text-gray-400">{service.time}</div>
                        </div>
                      ))}
                      {day.events.slice(0, 2).map((event, idx) => (
                        <button
                          key={`event-${idx}`}
                          onClick={() => setSelectedEvent(event)}
                          className="w-full text-left px-2 py-1 rounded-md bg-[#48007e] text-white hover:bg-[#5a009e] transition cursor-pointer"
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-[10px] text-white/70">{event.location}</div>
                        </button>
                      ))}
                      {day.events.length > 2 && (
                        <button
                          onClick={() => setSelectedEvent(day.events[0])}
                          className="w-full text-[11px] text-[#48007e] font-medium hover:underline py-0.5 text-center"
                        >
                          +{day.events.length - 2} more
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};

export default ChurchCalendar;
