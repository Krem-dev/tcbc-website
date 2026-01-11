"use client";

import React from "react";
import Image from "next/image";

type Partner = { name: string; logo: string };

const PartnersSection: React.FC = () => {
  const partners: Partner[] = [
    { name: "Partner 1", logo: "/images/eko_logo.png" },
    { name: "Partner 2", logo: "/images/alivecor_logo.png" },
    { name: "Partner 3", logo: "/images/gact_logo.png" },
    { name: "Partner 4", logo: "/images/edwards_logo.png" },
    { name: "Partner 5", logo: "/images/aisap.png" },
  ];

  const repeatedPartners = Array.from({ length: 6 }).flatMap(() => partners);

  return (
    <section className="pt-0 pb-4 bg-white">
      <div className="text-center">
        <h2 className="font-satoshi mb-4 text-4xl font-bold text-[#48007e] lg:text-5xl">
          Ministry Partners
        </h2>
      </div>

      <div
        className="relative w-full overflow-hidden"
        aria-label="Our ministry partners"
      >
        <div className="marquee" role="list">
          <div className="marquee-inner">
            {repeatedPartners.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                role="listitem"
                className="flex-shrink-0 w-40 px-6 flex items-center justify-center"
              >
                <div className="relative w-full h-16">
                  <Image
                    src={p.logo}
                    alt={`${p.name} logo`}
                    fill
                    sizes="160px"
                    className="object-contain"
                    draggable={false}
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee-scroll 30s linear infinite;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
