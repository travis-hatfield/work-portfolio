"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = [
  "People Operations",
  "HR Business Partnership",
  "AI-Enabled HR Tooling",
  "Org Design & Workforce Planning",
];

/** Small rotating status line — types out, pauses, deletes, moves to the next. */
export default function HeroStatus() {
  const [text, setText] = useState("");
  const roleIndexRef = useRef(0);
  const phaseRef = useRef<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const current = ROLES[roleIndexRef.current];
      const phase = phaseRef.current;

      setText((prev) => {
        if (phase === "typing") {
          if (prev.length < current.length) {
            timeout = setTimeout(tick, 38);
            return current.slice(0, prev.length + 1);
          }
          phaseRef.current = "pausing";
          timeout = setTimeout(tick, 900);
          return prev;
        }
        if (phase === "pausing") {
          phaseRef.current = "deleting";
          timeout = setTimeout(tick, 20);
          return prev;
        }
        // deleting
        if (prev.length > 0) {
          timeout = setTimeout(tick, 20);
          return prev.slice(0, -1);
        }
        roleIndexRef.current = (roleIndexRef.current + 1) % ROLES.length;
        phaseRef.current = "typing";
        timeout = setTimeout(tick, 38);
        return prev;
      });
    }

    timeout = setTimeout(tick, 38);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <p className="flex h-5 items-center gap-2 font-mono text-xs text-muted sm:text-sm">
      <span className="text-accent">$</span>
      <span>{text}</span>
      <span className="inline-block h-3.5 w-[2px] animate-pulse bg-accent" aria-hidden="true" />
    </p>
  );
}
