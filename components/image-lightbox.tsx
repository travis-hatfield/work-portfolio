"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  /** Show the screenshot at its own aspect ratio instead of cropping it into a 16:9 box.
   * Use for hero screenshots, where wide dashboard-style captures otherwise lose content off both edges. */
  preserveAspect?: boolean;
}

export default function ImageLightbox({ src, alt, caption, className, preserveAspect }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Framed thumbnail */}
      <div
        className={`group relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-all duration-200 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_16px_36px_-8px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 ${className || ""}`}
      >
        {/* Browser chrome bar */}
        <div className="flex items-center gap-1.5 border-b border-border bg-card/80 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        {/* Screenshot */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="block w-full cursor-zoom-in overflow-hidden"
          aria-label={`Expand screenshot: ${alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic aspect ratio and crop framing vary per screenshot; next/image's fill mode caused inconsistent load/crop behavior here */}
          <img
            src={src}
            alt={alt}
            className={
              preserveAspect
                ? "w-full transition-transform duration-300 group-hover:scale-[1.015]"
                : "aspect-[16/9] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"
            }
          />
        </button>
      </div>
      {caption && <p className="mt-2 text-sm text-muted">{caption}</p>}

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white transition-colors hover:text-gray-300"
            aria-label="Close image"
          >
            <X size={32} />
          </button>

          <div
            className="relative max-h-[90vh] max-w-4xl overflow-auto rounded-lg border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic size varies per screenshot; rendered on demand, not on initial page load */}
            <img src={src} alt={alt} className="h-auto w-full" />
          </div>
        </div>
      )}
    </>
  );
}
