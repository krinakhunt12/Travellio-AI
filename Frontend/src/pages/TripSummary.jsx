import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTripContext } from "../context/TripContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function TripSummaryPage() {
  const navigate = useNavigate();
  const { tripData } = useTripContext();
  const [isVisible, setIsVisible] = useState(false);

  const heroImage = tripData.hero || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=80";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100/10 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-sky-100/5 to-transparent blur-3xl" />
      </div>

      <Navbar />

      {/* HERO BANNER - Enhanced */}
      <header className="relative w-full overflow-hidden" style={{ minHeight: "75vh" }}>
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="hero" 
            className="w-full h-full object-cover transform scale-110"
            style={{ filter: 'brightness(0.9)' }}
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-white via-white/95 to-transparent" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-6 h-6 rounded-full bg-white/20 animate-pulse" />
        <div className="absolute top-40 right-32 w-8 h-8 rounded-full bg-blue-300/20 animate-pulse delay-300" />
        <div className="absolute bottom-40 left-1/4 w-10 h-10 rounded-full bg-sky-200/10 animate-pulse delay-700" />

        {/* Centered Title with Animation */}
        <div className={`absolute inset-0 flex items-center justify-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl w-full text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
              <span className="text-sm font-semibold text-white">✨ YOUR TRAVEL PLAN</span>
            </div>
            
            <h1
              className="mx-auto text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
              style={{
                fontFamily: "Poppins, sans-serif",
                textShadow: "0 10px 40px rgba(2,6,23,0.5)",
              }}
            >
              <span className="bg-gradient-to-r from-white via-white/95 to-blue-100 bg-clip-text text-transparent">
                {tripData.destination || "Your Dream Destination"}
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                  {tripData.startDate || "—"} {tripData.startDate && tripData.endDate ? `→ ${tripData.endDate}` : ""}
                </span>
              </div>
              
              {tripData.duration && (
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/60" />
                  <span className="text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                    {tripData.duration}
                  </span>
                </div>
              )}
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce-slow">
              <div className="flex flex-col items-center">
                <span className="text-white/60 text-sm mb-2">Explore Details</span>
                <div className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-2">
                  <div className="w-1.5 h-3 rounded-full bg-white/60 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 -mt-40 md:-mt-48 px-4 md:px-8 pb-32">
        {/* QUICK STATS - Enhanced */}
        <section className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: "🌤️", 
                label: "Weather", 
                value: tripData.weather || "28°C Sunny",
                color: "#2C74B3",
                desc: "Perfect beach weather"
              },
              { 
                icon: "💰", 
                label: "Estimated Cost", 
                value: tripData.estimatedCost || "$1,250",
                color: "#6BBFF1",
                desc: "All-inclusive per person"
              },
              { 
                icon: "🕒", 
                label: "Duration", 
                value: tripData.duration || "5 Days",
                color: "#0EA5E9",
                desc: "Including travel days"
              },
              { 
                icon: "🎯", 
                label: "Activities", 
                value: tripData.activities || "12 Planned",
                color: "#0369A1",
                desc: "Curated experiences"
              },
            ].map((stat, idx) => (
              <div 
                key={stat.label}
                className="group transform transition-all duration-500 hover:-translate-y-3"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div
                  className="h-full p-8 rounded-3xl relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                    boxShadow: '0 20px 40px rgba(15,23,42,0.08)',
                    border: '1px solid rgba(107, 191, 241, 0.15)'
                  }}
                >
                  {/* Background Glow */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Icon Container */}
                  <div 
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                    style={{ 
                      background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                      border: `1px solid ${stat.color}20`
                    }}
                  >
                    {stat.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-sm font-medium text-gray-500 mb-2">{stat.label}</div>
                    <div 
                      className="text-2xl font-bold mb-3"
                      style={{ 
                        fontFamily: "Poppins, sans-serif",
                        color: stat.color
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400">{stat.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CITY OVERVIEW - Enhanced */}
        <section className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm font-semibold" style={{ color: '#2C74B3' }}>DESTINATION OVERVIEW</span>
              </div>
              
              <h2 
                className="text-4xl md:text-5xl font-bold leading-tight"
                style={{ 
                  fontFamily: "Poppins, sans-serif", 
                  color: "#0F172A" 
                }}
              >
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 bg-clip-text text-transparent">
                  {tripData.destination?.split(',')[0] || "Paradise"}
                </span>
              </h2>
              
              <p 
                className="text-gray-700 leading-relaxed text-lg"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {tripData.description ||
                  "Bali is a stunning island paradise known for its beautiful beaches, vibrant culture, and lush rice terraces. Perfect for both adventure seekers and those looking to relax. The island offers world-class surfing, ancient temples, and incredible cuisine that blends tradition with fresh, local ingredients."}
              </p>
              
              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { label: "Best For", value: "Beaches & Culture" },
                  { label: "Time Zone", value: "GMT+8" },
                  { label: "Language", value: "Bahasa Indonesia" },
                  { label: "Currency", value: "IDR (Rupiah)" },
                ].map((fact) => (
                  <div 
                    key={fact.label}
                    className="p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(248,250,252,0.4) 100%)',
                      border: '1px solid rgba(107, 191, 241, 0.1)'
                    }}
                  >
                    <div className="text-sm font-medium text-gray-500">{fact.label}</div>
                    <div className="font-semibold text-gray-900">{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <div 
                className="absolute inset-0 rounded-3xl transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-2"
                style={{
                  background: 'linear-gradient(135deg, #6BBFF1, #2C74B3)',
                  opacity: 0.1
                }}
              />
              
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:scale-[1.02]">
                <img
                  src={tripData.previewImage || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80"}
                  alt="city preview"
                  className="w-full h-80 md:h-96 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Image Badge */}
                <div className="absolute top-6 right-6">
                  <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                    Must Visit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEST TIME TO VISIT - Enhanced */}
        <section className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div 
            className="p-10 rounded-3xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
              boxShadow: '0 20px 40px rgba(2,6,23,0.08)',
              border: '1px solid rgba(107, 191, 241, 0.15)'
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-sky-300 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-300 to-sky-200 rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-4">
                    <span className="text-sm font-semibold" style={{ color: '#2C74B3' }}>CLIMATE GUIDE</span>
                  </div>
                  <h3 
                    className="text-3xl md:text-4xl font-bold"
                    style={{ 
                      fontFamily: "Poppins, sans-serif", 
                      color: "#0F172A" 
                    }}
                  >
                    Best Time to Visit
                  </h3>
                  <p className="text-gray-600 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
                    Monthly weather patterns and ideal travel months
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-sm text-gray-600">Ideal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="text-sm text-gray-600">Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                    <span className="text-sm text-gray-600">Avoid</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
                {[
                  { month: "Jan", temp: "30°C", status: "good" },
                  { month: "Feb", temp: "31°C", status: "ideal" },
                  { month: "Mar", temp: "31°C", status: "ideal" },
                  { month: "Apr", temp: "31°C", status: "ideal" },
                  { month: "May", temp: "30°C", status: "good" },
                  { month: "Jun", temp: "29°C", status: "avoid" },
                  { month: "Jul", temp: "29°C", status: "avoid" },
                  { month: "Aug", temp: "29°C", status: "avoid" },
                  { month: "Sep", temp: "30°C", status: "good" },
                  { month: "Oct", temp: "31°C", status: "ideal" },
                  { month: "Nov", temp: "31°C", status: "ideal" },
                  { month: "Dec", temp: "30°C", status: "good" },
                ].map((item, idx) => (
                  <div 
                    key={item.month}
                    className="group transform transition-all duration-300 hover:-translate-y-2"
                  >
                    <div 
                      className="p-4 rounded-2xl text-center relative overflow-hidden transition-all duration-300 group-hover:shadow-lg"
                      style={{
                        background: item.status === 'ideal' 
                          ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)'
                          : item.status === 'good'
                          ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(234, 179, 8, 0.05) 100%)'
                          : 'linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.4) 100%)',
                        border: `1px solid ${
                          item.status === 'ideal' ? 'rgba(34, 197, 94, 0.2)' :
                          item.status === 'good' ? 'rgba(234, 179, 8, 0.2)' :
                          'rgba(203, 213, 225, 0.2)'
                        }`
                      }}
                    >
                      <div 
                        className="font-semibold text-lg mb-1"
                        style={{ 
                          color: item.status === 'ideal' ? '#16a34a' :
                                 item.status === 'good' ? '#ca8a04' :
                                 '#64748b'
                        }}
                      >
                        {item.month}
                      </div>
                      <div className="text-sm text-gray-600">{item.temp}</div>
                      
                      {/* Status Indicator */}
                      <div 
                        className="absolute top-2 right-2 w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150"
                        style={{ 
                          backgroundColor: item.status === 'ideal' ? '#22c55e' :
                                         item.status === 'good' ? '#eab308' :
                                         '#cbd5e1'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">💡</div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Travel Tip</div>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                      Visit between February and April for the best weather conditions with fewer crowds. 
                      This period offers perfect beach days and ideal conditions for outdoor activities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Enhanced */}
        <section className={`max-w-3xl mx-auto transform transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div 
            className="relative p-12 rounded-3xl overflow-hidden text-center group"
            style={{
              background: 'linear-gradient(135deg, #6BBFF1 0%, #2C74B3 100%)',
              boxShadow: '0 25px 50px rgba(44, 116, 179, 0.3)'
            }}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Explore Your Itinerary?
              </h3>
              
              <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                View your complete day-by-day schedule, activity details, booking information, 
                and personalized recommendations.
              </p>
              
              <button
                onClick={() => navigate("/itinerary")}
                className="group inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-white text-[#2C74B3] font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              >
                <span>View Full Itinerary</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </button>
              
              <div className="mt-10 text-white/70 text-sm">
                <span className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                  Personalized AI-generated schedule
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Wave Divider */}
        <div className="mt-20 relative">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent to-white/30" />
          <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
            <path 
              d="M0,96 C240,48 480,144 720,96 C960,48 1200,144 1440,96 L1440,120 L0,120 Z" 
              fill="url(#gradient)" 
              opacity="0.2"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6BBFF1" />
                <stop offset="100%" stopColor="#2C74B3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </main>

      <Footer />
      
      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}