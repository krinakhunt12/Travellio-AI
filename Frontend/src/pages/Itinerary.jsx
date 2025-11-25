import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const itinerary = [
  {
    day: 1,
    title: "Arrival & Beach Sunset",
    activities: [
      { time: "Morning", icon: "✈️", title: "Arrive at Ngurah Rai Airport", description: "Pick up rental car" },
      { time: "Afternoon", icon: "🏨", title: "Check-in at Seminyak Resort", description: "Relax by the pool" },
      { time: "Evening", icon: "🌅", title: "Seminyak Beach Sunset", description: "Watch the sunset with dinner" },
    ],
  },
  {
    day: 2,
    title: "Cultural Exploration",
    activities: [
      { time: "Morning", icon: "🛕", title: "Tanah Lot Temple", description: "Visit ancient sea temple" },
      { time: "Afternoon", icon: "🍜", title: "Local Warung Lunch", description: "Try authentic Nasi Goreng" },
      { time: "Evening", icon: "🎭", title: "Ubud Traditional Dance", description: "Kecak fire dance performance" },
    ],
  },
  {
    day: 3,
    title: "Adventure Day",
    activities: [
      { time: "Morning", icon: "🌾", title: "Tegallalang Rice Terraces", description: "Sunrise photo walk" },
      { time: "Afternoon", icon: "🏄", title: "Surfing Lesson", description: "Learn to surf at Kuta Beach" },
      { time: "Evening", icon: "🍹", title: "Beach Club", description: "Relax at Potato Head" },
    ],
  },
];

export default function ItineraryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #D9EEF9 100%)" }}>
      <Navbar />

      <div className="relative overflow-hidden">
        {/* subtle cloud texture at top */}
        <svg className="absolute -top-10 left-0 w-full opacity-30 pointer-events-none" viewBox="0 0 1440 140" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#D9EEF9" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d="M0 60 C200 10 400 10 600 60 C800 110 1000 110 1200 60 C1300 30 1400 30 1440 50 L1440 0 L0 0 Z" fill="url(#g)" />
        </svg>

        <div className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-center" style={{ fontFamily: "Poppins, sans-serif", color: "#0F172A" }}>
              Your Personalized Itinerary
            </h1>
            <p className="text-center text-gray-600 mb-12">Day-by-day plan for an unforgettable journey</p>

            {/* Timeline wrapper */}
            <div className="relative">
              {/* vertical timeline line */}
              <div className="hidden md:block absolute left-20 top-0 bottom-0 w-0.5" style={{ background: '#90D3F8', opacity: 0.9 }} />

              <div className="space-y-12">
                {itinerary.map((day) => (
                  <div key={day.day} className="relative md:flex md:items-start md:gap-8">
                    {/* Day badge */}
                    <div className="md:shrink-0 md:w-48 md:flex md:items-center">
                      <div className="flex items-center md:justify-end">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-2xl md:mr-6"
                          style={{ background: 'linear-gradient(135deg, #6BBFF1, #2C74B3)' }}>
                          {day.day}
                        </div>
                        <div className="hidden md:block text-left">
                          <div className="text-sm text-gray-500">Day {day.day}</div>
                          <div className="text-xl font-semibold" style={{ color: '#0F172A' }}>{day.title}</div>
                        </div>
                      </div>
                    </div>

                    {/* Activities column */}
                    <div className="mt-6 md:mt-0 md:flex-1 md:pl-8">
                      <div className="space-y-6">
                        {day.activities.map((activity, idx) => (
                          <div key={idx} className="relative">
                            {/* node on the timeline */}
                            <div className="absolute -left-10 md:left-6 top-6 w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg,#6BBFF1,#2C74B3)', boxShadow: '0 4px 14px rgba(43,140,215,0.12)' }} />

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md transition-transform duration-300 hover:scale-105"
                              style={{ boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)' }}>
                              <div className="flex items-start gap-4">
                                <div className="text-4xl flex-shrink-0">{activity.icon}</div>
                                <div className="flex-1">
                                  <div className="text-xs text-gray-500 uppercase mb-1">{activity.time}</div>
                                  <div className="text-lg font-semibold" style={{ color: '#0F172A' }}>{activity.title}</div>
                                  <div className="text-sm text-gray-600 mt-2">{activity.description}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/hotels")}
                className="px-10 py-4 rounded-2xl font-semibold text-white text-lg transition-transform transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6BBFF1, #2C74B3)",
                  boxShadow: "0 8px 20px rgba(44, 116, 179, 0.3)",
                }}
              >
                Browse Hotels →
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
