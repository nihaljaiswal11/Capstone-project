"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageSlideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  if (!images.length) return null;
  // Optimize Contentful image URL for slideshow size
  const imgUrl = images[current]
    ? `${images[current]}?w=800&h=320&fit=fill`
    : null;
  return (
    <div className="relative w-full h-56 sm:h-72 mb-2">
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={`Slide ${current + 1}`}
          width={800}
          height={320}
          className="w-full h-56 sm:h-72 object-cover rounded"
          style={{ aspectRatio: "2.5/1" }}
          loading="lazy"
          priority={false}
          sizes="(max-width: 768px) 100vw, 66vw"
        />
      )}
      {images.length > 1 && (
        <>
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
            onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
            aria-label="Previous image"
            type="button"
          >
            &#8592;
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            onClick={() => setCurrent((c) => (c + 1) % images.length)}
            aria-label="Next image"
            type="button"
          >
            &#8594;
          </Button>
        </>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full ${i === current ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 