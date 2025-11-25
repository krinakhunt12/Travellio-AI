import React, { useEffect, useState } from "react";

export default function AnimatedText({ text = "", className = "", charDelay = 28, style = {} }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <span className={className} style={{ display: "inline-block", ...style }}>
      {Array.from(String(text)).map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          style={{
            display: "inline-block",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 420ms cubic-bezier(.2,.9,.2,1) ${i * charDelay}ms, transform 420ms cubic-bezier(.2,.9,.2,1) ${i * charDelay}ms`,
            willChange: "opacity, transform",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
