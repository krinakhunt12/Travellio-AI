import React from "react";
import { useNavigate } from "react-router-dom";
import { useTripContext } from "../context/TripContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function TripSummaryPage() {
  const navigate = useNavigate();
  const { tripData } = useTripContext();

  const heroImage = tripData.hero || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80";

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      {/* HERO BANNER */}
      <header className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>
        <img src={heroImage} alt="hero" className="absolute inset-0 w-full h-full object-cover" />

        {/* subtle dark overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(255,255,255,1) 100%)",
          }}
        />

        {/* Centered Title */}
        <div className="absolute inset-x-0 bottom-12 text-center px-6">
          <h1
            className="mx-auto max-w-4xl text-4xl md:text-6xl font-extrabold text-white"
            style={{
              fontFamily: "Poppins, sans-serif",
              textShadow: "0 8px 30px rgba(2,6,23,0.45)",
              WebkitTextStroke: "0px rgba(0,0,0,0)",
              filter: "drop-shadow(0 8px 30px rgba(43,140,215,0.18))",
            }}
          >
            {tripData.destination || "Your Dream Destination"}
          </h1>
          <p className="mt-3 text-sm md:text-lg text-white/90" style={{ fontFamily: "Inter, sans-serif" }}>
            {tripData.startDate || "—"} {tripData.startDate && tripData.endDate ? `— ${tripData.endDate}` : ""}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-28 pb-16">
        {/* QUICK STATS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 relative z-20">
          {[
            { icon: "🌤️", label: "Weather", value: tripData.weather || "28°C Sunny" },
            { icon: "💰", label: "Est. Cost", value: tripData.estimatedCost || "$1,250" },
            { icon: "🕒", label: "Duration", value: tripData.duration || "5 Days" },
            { icon: "🎯", label: "Activities", value: tripData.activities || "12 Planned" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center transform transition hover:-translate-y-2"
              style={{ boxShadow: "0 12px 30px rgba(15,23,42,0.08)" }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="text-xl font-semibold mt-2" style={{ color: "#2C74B3", fontFamily: "Poppins, sans-serif" }}>
                {stat.value}
              </div>
            </div>
          ))}
        </section>

        {/* CITY OVERVIEW */}
        <section className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-6 flex-col md:flex-row">
            <div className="flex-1">
              <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "Poppins, sans-serif", color: "#0F172A" }}>
                City Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                {tripData.description ||
                  "Bali is a stunning island paradise known for its beautiful beaches, vibrant culture, and lush rice terraces. Perfect for both adventure seekers and those looking to relax. The island offers world-class surfing, ancient temples, and incredible cuisine that blends tradition with fresh, local ingredients."}
              </p>
            </div>
            <div className="w-full md:w-72 mt-6 md:mt-0">
              <div className="w-full h-44 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={tripData.previewImage || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=60"}
                  alt="city preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* BEST TIME TO VISIT */}
        <section className="rounded-3xl p-6 mb-10" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #D9EEF9 100%)" }}>
          <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Poppins, sans-serif", color: "#0F172A" }}>
            Best Time to Visit
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month, idx) => (
              <div key={month} className="bg-white rounded-xl p-3 text-center" style={{ boxShadow: "0 6px 18px rgba(2,6,23,0.04)" }}>
                <div className="font-medium text-sm text-slate-700">{month}</div>
                <div className="text-xs text-gray-500 mt-1">{(idx % 3) + 26}°C</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-6">
          <button
            onClick={() => navigate("/itinerary")}
            className="mx-auto px-10 py-4 rounded-2xl font-semibold text-white text-lg transition-transform transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #6BBFF1, #2C74B3)",
              boxShadow: "0 8px 20px rgba(44,116,179,0.3)",
            }}
          >
            View Full Itinerary →
          </button>
        </section>

        {/* Wave divider before footer */}
        <div className="mt-12">
          <svg viewBox="0 0 1440 80" className="w-full h-20" preserveAspectRatio="none">
            <path d="M0,32 C360,96 720,0 1080,32 C1260,56 1440,16 1440,16 L1440 80 L0 80 Z" fill="#ffffff" />
          </svg>
        </div>
      </main>

      <Footer />
    </div>
  );
}
