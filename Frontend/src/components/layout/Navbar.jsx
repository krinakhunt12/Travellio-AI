import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md backdrop-blur-none"
          : "bg-transparent backdrop-blur-md"
      }`}
      style={{
        background: scrolled ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
        backdropFilter: scrolled ? "none" : "blur(12px)",
        boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className={`text-xl font-bold transition-colors ${
            scrolled ? "text-slate-900" : "text-white"
          }`}
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Travellio ✈️
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className={`transition-colors hover:text-sky-500 ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/preferences"
            className={`transition-colors hover:text-sky-500 ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Plan Trip
          </Link>
          <Link
            to="/about"
            className={`transition-colors hover:text-sky-500 ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            About
          </Link>
          <Link
            to="/preferences"
            className="px-5 py-2 rounded-full font-semibold text-white transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #6BBFF1, #2C74B3)",
              boxShadow: "0 4px 12px rgba(44, 116, 179, 0.3)",
            }}
          >
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
}
