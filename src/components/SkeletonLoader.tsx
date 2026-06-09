"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export function ImageSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full" />
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-200 rounded h-4 w-full"
          style={{ width: i === lines - 1 ? "80%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-lg p-4 border border-gray-200">
      <div className="bg-gray-200 rounded h-48 w-full mb-4" />
      <div className="space-y-2">
        <div className="bg-gray-200 rounded h-6 w-3/4" />
        <div className="bg-gray-200 rounded h-4 w-full" />
        <div className="bg-gray-200 rounded h-4 w-5/6" />
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Next.js Image with a pulsing skeleton placeholder shown until the image
 * finishes loading, then fades in. The parent element must be `relative` and
 * sized (or pass `fill`). Reusable for any image that can be slow to load.
 */
export function ImageWithSkeleton({
  className = "",
  skeletonClassName = "",
  onLoad,
  ...props
}: ImageProps & { skeletonClassName?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-10 animate-pulse bg-gray-200 ${skeletonClassName}`}
        />
      )}
      <Image
        {...props}
        className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </>
  );
}
