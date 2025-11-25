import React from "react";

export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/30 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(15, 23, 42, 0.1)",
      }}
    >
      {children}
    </div>
  );
}
