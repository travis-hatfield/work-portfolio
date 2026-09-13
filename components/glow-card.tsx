"use client";

import { useRef, type ReactNode } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/** Wraps content in a card whose border/glow tracks the cursor on hover (see .glow-card in globals.css). */
export default function GlowCard({ children, className = "", as: Tag = "div" }: GlowCardProps) {
  const ref = useRef<HTMLElement | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const Component = Tag as React.ElementType;

  return (
    <Component ref={ref} onMouseMove={handleMouseMove} className={`glow-card ${className}`}>
      {children}
    </Component>
  );
}
