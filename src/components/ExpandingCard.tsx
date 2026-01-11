"use client";

import React from "react";
import Link from "next/link";

type ExpandingCardProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  isOpen?: boolean;
  onToggle?: () => void;
};

const ExpandingCard: React.FC<ExpandingCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <Link href={link}>
      <div
        className="relative h-[340px] rounded-2xl overflow-hidden shadow-lg cursor-pointer group shrink-0 snap-start w-full sm:w-[340px]"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-all duration-300" />

        {/* Gradient overlay at bottom for text contrast */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-100 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ExpandingCard;
