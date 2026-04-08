"use client";

import React from "react";
import Image from "next/image";
import { X, MapPin, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type EventData = {
  _id: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  category?: string;
  image?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
};

type EventDetailModalProps = {
  event: EventData | null;
  isOpen: boolean;
  onClose: () => void;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    worship: "Worship",
    community: "Community",
    youth: "Youth",
    women: "Women",
    men: "Men",
    children: "Children",
    other: "Other",
  };
  return labels[category] || category;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!event) return null;

  const imageUrl = event.image?.asset?.url || "/service1.jpg";
  const hasDateInfo = event.startDate;
  const hasEndDate = event.endDate;
  const isSameDay =
    hasDateInfo &&
    hasEndDate &&
    new Date(event.startDate!).toDateString() ===
      new Date(event.endDate!).toDateString();

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Event Image */}
            <div className="relative w-full shrink-0 overflow-hidden rounded-t-3xl bg-gray-900">
              <div className="relative w-full" style={{ maxHeight: '60vh' }}>
                <Image
                  src={imageUrl}
                  alt={event.image?.alt || event.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '60vh' }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category badge */}
              {event.category && (
                <span className="absolute top-4 left-4 bg-[#48007e] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {getCategoryLabel(event.category)}
                </span>
              )}

              {/* Title overlay */}
              <div className="absolute bottom-4 left-6 right-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              {/* Event Details */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-5">
                {hasDateInfo && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#48007e]" />
                    {formatDate(event.startDate!)}
                    {hasEndDate && !isSameDay && (
                      <> &ndash; {formatDate(event.endDate!)}</>
                    )}
                  </span>
                )}
                {hasDateInfo && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#48007e]" />
                    {formatTime(event.startDate!)}
                    {hasEndDate && ` – ${formatTime(event.endDate!)}`}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#48007e]" />
                    {event.location}
                  </span>
                )}
              </div>

              {/* Description */}
              {event.description && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventDetailModal;
