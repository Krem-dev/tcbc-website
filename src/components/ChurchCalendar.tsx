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

            {/* Desktop / tablet month grid (lg and up) */}
            <div className="hidden lg:block">
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
                {calendarDays.map((day, index) => (
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
                ))}
              </div>
            </div>

            {/* Mobile / tablet agenda list (below lg) */}
            <div className="lg:hidden">
              {(() => {
                const agendaDays = calendarDays.filter(
                  (day) =>
                    day.isCurrentMonth &&
                    (day.services.length > 0 || day.events.length > 0)
                );

                if (agendaDays.length === 0) {
                  return (
                    <p className="px-6 py-12 text-center text-sm text-gray-500">
                      No services or events scheduled this month.
                    </p>
                  );
                }

                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();

                return (
                  <ul className="divide-y divide-gray-100">
                    {agendaDays.map((day) => {
                      const weekday = new Date(year, month, day.date).toLocaleDateString(
                        "en-US",
                        { weekday: "short" }
                      );
                      return (
                        <li key={day.date} className="flex gap-3 px-4 py-3.5 sm:px-6">
                          <div className="w-12 flex-shrink-0 text-center">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                              {weekday}
                            </div>
                            <div
                              className={`mt-0.5 text-lg font-semibold ${
                                isToday(day.date)
                                  ? "mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#48007e] text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {day.date}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 space-y-2">
                            {day.services.map((service, idx) => (
                              <div
                                key={`m-service-${idx}`}
                                className="rounded-lg bg-gray-100 px-3 py-2"
                              >
                                <div className="text-sm font-medium text-gray-800">
                                  {service.service}
                                </div>
                                <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="h-3 w-3" />
                                  {service.time}
                                </div>
                              </div>
                            ))}
                            {day.events.map((event, idx) => (
                              <button
                                key={`m-event-${idx}`}
                                onClick={() => setSelectedEvent(event)}
                                className="block w-full rounded-lg bg-[#48007e] px-3 py-2 text-left text-white transition hover:bg-[#5a009e]"
                              >
                                <div className="text-sm font-medium">{event.title}</div>
                                {event.location && (
                                  <div className="mt-0.5 flex items-center gap-1 text-xs text-white/75">
                                    <MapPin className="h-3 w-3 flex-shrink-0" />
                                    <span className="truncate">{event.location}</span>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                );
              })()}
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
