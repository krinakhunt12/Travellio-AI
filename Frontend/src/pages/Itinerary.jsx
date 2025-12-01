import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const itinerary = [
  {
    day: 1,
    title: "Arrival & Beach Sunset",
    tagline: "Begin Your Bali Adventure",
    activities: [
      { time: "Morning", icon: "✈️", title: "Arrive at Ngurah Rai Airport", description: "Pick up rental car and transfer to accommodation", duration: "2h" },
      { time: "Afternoon", icon: "🏨", title: "Check-in at Seminyak Resort", description: "Relax by the pool and refresh", duration: "3h" },
      { time: "Evening", icon: "🌅", title: "Seminyak Beach Sunset", description: "Watch the sunset with beachside dinner", duration: "2.5h" },
    ],
    color: "#2C74B3",
    highlight: "First Bali Sunset"
  },
  {
    day: 2,
    title: "Cultural Exploration",
    tagline: "Discover Balinese Heritage",
    activities: [
      { time: "Morning", icon: "🛕", title: "Tanah Lot Temple", description: "Visit ancient sea temple at low tide", duration: "3h" },
      { time: "Afternoon", icon: "🍜", title: "Local Warung Lunch", description: "Try authentic Nasi Goreng and Satay", duration: "1.5h" },
      { time: "Evening", icon: "🎭", title: "Ubud Traditional Dance", description: "Kecak fire dance performance", duration: "2h" },
    ],
    color: "#6BBFF1",
    highlight: "Traditional Dance Experience"
  },
  {
    day: 3,
    title: "Adventure Day",
    tagline: "Nature & Ocean Thrills",
    activities: [
      { time: "Morning", icon: "🌾", title: "Tegallalang Rice Terraces", description: "Sunrise photo walk through iconic fields", duration: "4h" },
      { time: "Afternoon", icon: "🏄", title: "Surfing Lesson", description: "Learn to surf at Kuta Beach with instructor", duration: "3h" },
      { time: "Evening", icon: "🍹", title: "Beach Club", description: "Relax at Potato Head with ocean views", duration: "4h" },
    ],
    color: "#0EA5E9",
    highlight: "Surfing Adventure"
  },
];

export default function ItineraryPage() {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100/5 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-sky-100/5 to-transparent blur-3xl" />
      </div>

      <Navbar />

      <div className="relative">
        {/* Hero Header */}
        <div className={`relative pt-32 pb-20 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-8">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm font-semibold" style={{ color: '#2C74B3' }}>YOUR JOURNEY ITINERARY</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Your Personalized
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 bg-clip-text text-transparent">
                  Journey Itinerary
                </span>
              </h1>
              
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                A beautifully crafted day-by-day plan for your unforgettable adventure in Bali
              </p>
            </div>

            {/* Day Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {itinerary.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={`group px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    activeDay === day.day 
                      ? 'transform scale-105 shadow-lg' 
                      : 'hover:scale-105 hover:shadow-md'
                  }`}
                  style={{
                    background: activeDay === day.day 
                      ? `linear-gradient(135deg, ${day.color}, ${day.color}DD)` 
                      : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.7) 100%)',
                    color: activeDay === day.day ? 'white' : '#64748b',
                    border: `1px solid ${activeDay === day.day ? 'transparent' : 'rgba(107, 191, 241, 0.2)'}`,
                    boxShadow: activeDay === day.day ? `0 8px 32px ${day.color}40` : 'none'
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">Day {day.day}</span>
                    {activeDay === day.day && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Timeline */}
        <div className={`max-w-6xl mx-auto px-4 pb-32 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-sky-300 to-blue-300" style={{ opacity: 0.3 }} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse" />
            </div>

            {/* Timeline Items */}
            <div className="space-y-16 lg:space-y-24">
              {itinerary.map((day, dayIndex) => (
                <div key={day.day} className="relative">
                  {/* Day Header - Mobile */}
                  <div className="lg:hidden mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl"
                        style={{ 
                          background: `linear-gradient(135deg, ${day.color}, ${day.color}DD)`,
                          boxShadow: `0 10px 40px ${day.color}40`
                        }}
                      >
                        {day.day}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Day {day.day}</div>
                        <h3 className="text-2xl font-bold" style={{ color: '#0F172A' }}>{day.title}</h3>
                        <p className="text-gray-600 text-sm">{day.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Day Header - Desktop */}
                  <div className="hidden lg:flex items-center justify-center mb-12">
                    <div className="text-center">
                      <div 
                        className="inline-flex items-center gap-4 px-6 py-3 rounded-full mb-4"
                        style={{ 
                          background: `linear-gradient(135deg, ${day.color}15, ${day.color}05)`,
                          border: `1px solid ${day.color}20`
                        }}
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ 
                            background: `linear-gradient(135deg, ${day.color}, ${day.color}DD)`
                          }}
                        >
                          {day.day}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium" style={{ color: day.color }}>Day {day.day}</div>
                          <div className="font-bold text-lg" style={{ color: '#0F172A' }}>{day.title}</div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 rounded-2xl inline-block" style={{ background: 'rgba(255,255,255,0.7)' }}>
                        <div className="text-sm text-gray-500">Today's Highlight</div>
                        <div className="font-semibold" style={{ color: day.color }}>{day.highlight}</div>
                      </div>
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="relative">
                    {/* Connecting Line for Activities */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent" />
                    </div>

                    <div className="space-y-8 lg:space-y-12">
                      {day.activities.map((activity, activityIndex) => (
                        <div 
                          key={activityIndex}
                          className={`group transform transition-all duration-500 hover:-translate-y-1 ${
                            day.day === activeDay ? 'opacity-100' : 'opacity-70'
                          }`}
                          style={{ transitionDelay: `${activityIndex * 100}ms` }}
                        >
                          {/* Timeline Node */}
                          <div className="hidden lg:block absolute left-1/2 top-8 -translate-x-1/2 z-20">
                            <div className="relative">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                                style={{ 
                                  background: `linear-gradient(135deg, ${day.color}, ${day.color}DD)`,
                                  boxShadow: `0 8px 32px ${day.color}40`
                                }}
                              >
                                {activity.icon}
                              </div>
                              
                              {/* Pulsing Ring Effect */}
                              <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{ borderColor: day.color, opacity: 0.3 }} />
                            </div>
                          </div>

                          {/* Activity Card */}
                          <div className={`
                            relative p-6 lg:p-8 rounded-3xl transition-all duration-500 group-hover:shadow-2xl
                            ${activityIndex % 2 === 0 ? 'lg:mr-auto lg:w-5/12' : 'lg:ml-auto lg:w-5/12'}
                          `}
                            style={{
                              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                              border: `1px solid ${day.color}20`,
                              boxShadow: '0 20px 40px rgba(15,23,42,0.08)'
                            }}
                          >
                            {/* Card Background Glow */}
                            <div 
                              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background: `radial-gradient(circle at center, ${day.color}10 0%, transparent 70%)`,
                              }}
                            />

                            <div className="relative z-10">
                              {/* Mobile Icon */}
                              <div className="lg:hidden mb-4">
                                <div 
                                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                                  style={{ 
                                    background: `linear-gradient(135deg, ${day.color}15, ${day.color}05)`,
                                    border: `1px solid ${day.color}20`
                                  }}
                                >
                                  {activity.icon}
                                </div>
                              </div>

                              <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div 
                                      className="px-3 py-1 rounded-full text-xs font-medium"
                                      style={{ 
                                        background: `linear-gradient(135deg, ${day.color}15, ${day.color}05)`,
                                        color: day.color
                                      }}
                                    >
                                      {activity.time}
                                    </div>
                                    <div className="text-sm text-gray-500">{activity.duration}</div>
                                  </div>
                                  
                                  <h4 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>
                                    {activity.title}
                                  </h4>
                                  
                                  <p className="text-gray-600 leading-relaxed">
                                    {activity.description}
                                  </p>
                                </div>

                                {/* Desktop Icon */}
                                <div className="hidden lg:block">
                                  <div 
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                                    style={{ 
                                      background: `linear-gradient(135deg, ${day.color}15, ${day.color}05)`,
                                      border: `1px solid ${day.color}20`
                                    }}
                                  >
                                    {activity.icon}
                                  </div>
                                </div>
                              </div>

                              {/* Progress Bar */}
                              <div className="mt-6">
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                  <span>Activity Progress</span>
                                  <span>•</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-700 group-hover:w-full"
                                    style={{ 
                                      width: `${(activityIndex + 1) * 33}%`,
                                      background: `linear-gradient(90deg, ${day.color}, ${day.color}DD)`
                                    }}
                                  />
                                </div>
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

            {/* Next Steps CTA */}
            <div className={`mt-24 text-center transform transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div 
                className="inline-block p-1 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, #6BBFF1, #2C74B3)',
                  boxShadow: '0 20px 40px rgba(44, 116, 179, 0.2)'
                }}
              >
                <div 
                  className="relative p-10 rounded-[28px] overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                  }}
                >
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#0F172A' }}>
                      Ready for the Next Step?
                    </h3>
                    
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                      Your itinerary is set! Now let's find the perfect accommodation for your journey.
                    </p>
                    
                    <button
                      onClick={() => navigate("/hotels")}
                      className="group inline-flex items-center gap-4 px-10 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #6BBFF1 0%, #2C74B3 100%)',
                        boxShadow: '0 10px 30px rgba(44, 116, 179, 0.3)'
                      }}
                    >
                      <span>Browse Available Hotels</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                    </button>
                    
                    <div className="mt-8 text-sm text-gray-500">
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        50+ verified hotels with special rates
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-ping {
          animation: pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}