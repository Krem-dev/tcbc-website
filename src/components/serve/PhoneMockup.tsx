"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type Props = {
  images: string[];
  className?: string;
};

export default function PhoneMockup({ images, className = "" }: Props) {
  const screens =
    Array.isArray(images) && images.length > 0 ? images : ["/placeholder.svg"];

  return (
    <div className={`relative ${className}`}>
      <div
        className="mx-auto w-[85vw] max-w-[220px] aspect-[9/19] h-auto
             sm:max-w-[220px] sm:h-auto
             md:max-w-[220px] md:h-auto
             lg:max-w-[270px] lg:h-[560px]
             xl:max-w-[285px] xl:h-[590px]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[50px] border-[6px] border-gray-800 bg-black shadow-2xl">
          <div className="hidden sm:block absolute top-[70px] -left-[5px] w-[3px] h-8 bg-gray-500 rounded-r" />
          <div className="hidden sm:block absolute top-[120px] -left-[5px] w-[3px] h-20 bg-gray-500 rounded-r" />
          <div className="hidden sm:block absolute top-[130px] -right-[5px] w-[3px] h-[72px] bg-gray-500 rounded-l" />

          <div className="absolute top-[12px] bottom-[10px] left-[8px] right-[8px] overflow-hidden rounded-[30px] bg-[#eff1f4]">
            <Swiper
              direction="vertical"
              slidesPerView={1}
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[Autoplay]}
              className="h-full w-full"
            >
              {screens.map((src, i) => (
                <SwiperSlide key={`${src}-${i}`}>
                  <div className="relative h-full w-full bg-white">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`App screen ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 78vw, 285px"
                      className="object-contain"
                      draggable={false}
                      priority={i === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-10 h-4 w-32 rounded-b-2xl bg-black" />
        </div>
      </div>
    </div>
  );
}
