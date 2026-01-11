"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

type Props = {
  images: ReadonlyArray<string>;
  className?: string;
  fit?: "contain" | "cover";
  decorative?: boolean;
  label?: string;
  autoDelay?: number;
};

export default function TabletMockup({
  images,
  className = "",
  fit = "contain",
  decorative = true,
  label = "Tablet screenshots carousel",
  autoDelay = 2500,
}: Props) {
  const [allowMotion, setAllowMotion] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const screens = useMemo(
    () =>
      Array.isArray(images) && images.length > 0
        ? images
        : ["/placeholder.svg"],
    [images]
  );

  const fitClass = fit === "cover" ? "object-cover" : "object-contain";
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const autoplay = useMemo(
    () =>
      allowMotion
        ? {
            delay: autoDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
    [allowMotion, autoDelay]
  );

  return (
    <div
      className={[
        "relative z-0 right-8 md:right-2",
        "w-[420px] sm:w-[380px] md:w-[480px] lg:w-[540px] xl:w-[600px]",
        "h-[260px] sm:h-[260px] md:h-[320px] lg:h-[360px] xl:h-[400px]",
        "rounded-[20px] xs:rounded-[22px] sm:rounded-[24px] md:rounded-[26px]",
        "bg-gray-900 shadow-lg sm:shadow-xl lg:shadow-2xl",
        "border-[4px] xs:border-[5px] sm:border-[6px] border-gray-700",
        "overflow-hidden",
        "opacity-95 scale-[0.8] xs:scale-[0.85] sm:scale-90 md:scale-95 lg:scale-100",
        "mx-auto lg:mx-0",
        className,
      ].join(" ")}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "region"}
      aria-roledescription={decorative ? undefined : "carousel"}
      aria-label={decorative ? undefined : label}
    >
      <div className="absolute inset-[6px] xs:inset-[7px] sm:inset-[8px] md:inset-[10px] rounded-[14px] xs:rounded-[15px] sm:rounded-[16px] md:rounded-[18px] overflow-hidden bg-[#f9fafb]">
        <Swiper
          direction="horizontal"
          slidesPerView={1}
          loop={screens.length > 1}
          autoplay={autoplay}
          modules={[Autoplay]}
          className="h-full w-full"
        >
          {screens.map((src, i) => (
            <SwiperSlide key={`${src}-${i}`}>
              <div className="relative w-full h-full">
                <Image
                  src={errors[i] ? "/placeholder.svg" : src}
                  alt={decorative ? "" : `Tablet screen ${i + 1}`}
                  fill
                  sizes="100%"
                  className={`${fitClass} bg-white`}
                  draggable={false}
                  priority={i === 0}
                  onError={() => setErrors((e) => ({ ...e, [i]: true }))}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="absolute right-[-4px] xs:right-[-5px] sm:right-[-6px] top-1/2 -translate-y-1/2 h-6 xs:h-7 sm:h-8 w-[3px] xs:w-[4px] sm:w-[5px] bg-gray-600 rounded-l-sm"></div>
      <div className="absolute left-[-4px] xs:left-[-5px] sm:left-[-6px] top-1/2 -translate-y-1/2 h-6 xs:h-7 sm:h-8 w-[3px] xs:w-[4px] sm:w-[5px] bg-gray-600 rounded-r-sm"></div>
    </div>
  );
}
