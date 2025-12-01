import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/colors.css";

const destinations = [
  {
    name: "Bali, Indonesia",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60&auto=format&fit=crop",
    distance: "2,340 km",
    bestMonth: "May",
    color: "#2C74B3"
  },
  {
    name: "Santorini, Greece",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=60&auto=format&fit=crop",
    distance: "7,845 km",
    bestMonth: "Sep",
    color: "#6BBFF1"
  },
  {
    name: "Maldives",
    img: "https://images.unsplash.com/photo-1505765051923-4c0a7f2f6e7f?w=1200&q=60&auto=format&fit=crop",
    distance: "4,560 km",
    bestMonth: "Nov",
    color: "#38BDF8"
  },
  {
    name: "Amalfi Coast, Italy",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=60&auto=format&fit=crop",
    distance: "8,210 km",
    bestMonth: "Jun",
    color: "#0EA5E9"
  },
  {
    name: "Phuket, Thailand",
    img: "https://images.unsplash.com/photo-1506801310323-534be5e7f4d3?w=1200&q=60&auto=format&fit=crop",
    distance: "3,120 km",
    bestMonth: "Feb",
    color: "#0369A1"
  },
  {
    name: "Bora Bora, French Polynesia",
    img: "https://images.unsplash.com/photo-1505765051923-4c0a7f2f6e7f?w=1200&q=60&auto=format&fit=crop",
    distance: "12,430 km",
    bestMonth: "Aug",
    color: "#0284C7"
  },
];

function DestinationCard({ d, onOpen }) {
  return (
    <div
      onClick={() => onOpen && onOpen(d)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen && onOpen(d)}
      className="relative rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl shadow-lg bg-card cursor-pointer group"
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(217,238,249,0.8) 100%)`,
        border: '1px solid rgba(255,255,255,0.3)'
      }}
    >
      <div className="relative overflow-hidden h-56">
        <img 
          src={d.img} 
          alt={d.name} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div 
          className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
          style={{ backgroundColor: d.color }}
        >
          {d.bestMonth}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: '#0F172A' }}>{d.name}</h3>
            <div className="flex items-center text-sm opacity-70">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {d.distance}
            </div>
          </div>
          <div className="text-3xl opacity-20 group-hover:opacity-30 transition-opacity">
            →
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium opacity-70">Best time to visit</span>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-50" style={{ color: d.color }}>
              {d.bestMonth}
            </span>
          </div>
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{
             background: `radial-gradient(circle at center, ${d.color}15 0%, transparent 70%)`,
           }}
      />
    </div>
  );
}

function DestinationModal({ dest, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!dest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl animate-fade-in-up"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        }}
      >
        {/* Modal Header */}
        <div className="relative h-72 md:h-80 overflow-hidden">
          <img 
            src={dest.img} 
            alt={dest.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold" style={{ color: '#0F172A' }}>{dest.name}</h2>
                <span 
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: dest.color }}
                >
                  {dest.bestMonth}
                </span>
              </div>
              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {dest.distance} away • Best visited in {dest.bestMonth}
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Discover the magic of {dest.name.split(',')[0]} with perfectly curated experiences. 
                From hidden beaches to cultural treasures, we craft personalized journeys that match your style.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: dest.color + '15' }}>
                    <span className="text-2xl">🏖️</span>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>Beaches & Nature</h4>
                  <p className="text-sm text-gray-600">Pristine beaches, lush landscapes, and breathtaking sunsets</p>
                </div>
                
                <div className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: dest.color + '15' }}>
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>Cuisine & Culture</h4>
                  <p className="text-sm text-gray-600">Authentic local food and immersive cultural experiences</p>
                </div>
                
                <div className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: dest.color + '15' }}>
                    <span className="text-2xl">🏨</span>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>Stay & Relax</h4>
                  <p className="text-sm text-gray-600">Luxury resorts and cozy boutique accommodations</p>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="md:w-80">
              <div 
                className="sticky top-8 p-6 rounded-2xl shadow-lg border border-blue-100"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2" style={{ color: dest.color }}>$1,250</div>
                  <div className="text-sm text-gray-600">Estimated total per person</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Accommodation</span>
                    <span className="font-medium">$850</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Activities</span>
                    <span className="font-medium">$250</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transport</span>
                    <span className="font-medium">$150</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>$1,250</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/preferences')}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${dest.color}, ${dest.color}DD)`,
                    boxShadow: `0 8px 32px ${dest.color}40`
                  }}
                >
                  Start Planning
                </button>
                
                <div className="text-center mt-4 text-sm text-gray-500">
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Free cancellation • Best price guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [selectedDest, setSelectedDest] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function openDestination(d) {
    setSelectedDest(d);
  }

  function closeDestination() {
    setSelectedDest(null);
  }

  return (
    <div className="min-h-screen font-sans antialiased bg-page overflow-hidden" style={{ color: 'var(--color-slate-black)' }}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100/20 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-sky-100/10 to-transparent blur-3xl" />
      </div>

      <Navbar scrolled={isScrolled} />
      
      {/* Hero Section */}
      <header className="relative">
        <div className="relative h-screen w-full overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=80&auto=format&fit=crop"
              alt="Tropical beach paradise"
              className="w-full h-full object-cover transform scale-110"
              style={{ filter: 'brightness(0.9)' }}
            />
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5" />

          {/* Animated Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-white/30 animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-blue-300/20 animate-pulse delay-300" />
          <div className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full bg-sky-200/10 animate-pulse delay-700" />

          {/* Hero Content */}
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="max-w-6xl w-full animate-fade-in-up">
              <div 
                className="rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-white/40 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(217,238,249,0.1) 100%)',
                  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.15)'
                }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                    <span className="text-sm font-medium text-white">✈️ Trusted by 50K+ travelers</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                    <span className="bg-gradient-to-r from-white via-white to-blue-100 bg-clip-text text-transparent">
                      Plan Your
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-100 via-white to-blue-50 bg-clip-text text-transparent">
                      Perfect Getaway
                    </span>
                  </h1>
                  
                  <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Smart itineraries and curated experiences powered by AI. 
                    Discover hidden gems and create memories that last.
                  </p>
                </div>

                {/* Search Form */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-1 shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                    <div className="p-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Destination</label>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <input 
                          className="w-full bg-transparent outline-none placeholder-gray-400"
                          placeholder="Where to?"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Dates</label>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <input 
                          className="w-full bg-transparent outline-none placeholder-gray-400"
                          placeholder="Any dates"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Travelers</label>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0h-6" />
                        </svg>
                        <input 
                          className="w-full bg-transparent outline-none placeholder-gray-400"
                          placeholder="2 travelers"
                        />
                      </div>
                    </div>
                    
                    <div className="p-1">
                      <button 
                        onClick={() => navigate('/preferences')}
                        className="w-full h-full rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: 'linear-gradient(135deg, #6BBFF1 0%, #2C74B3 100%)',
                          boxShadow: '0 8px 32px rgba(44, 116, 179, 0.3)'
                        }}
                      >
                        <div className="flex items-center justify-center gap-2 py-4">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          Search Destinations
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-4 text-white/80 text-sm">
                    <span>Try:</span>
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">Bali</span>
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">Santorini</span>
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">Maldives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
              <div className="w-1 h-3 rounded-full bg-white/70 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 -mt-20 px-4 md:px-8 pb-20">
        {/* Destinations Section */}
        <section id="destinations" className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-4">
              <span className="text-sm font-semibold" style={{ color: '#2C74B3' }}>🌎 POPULAR DESTINATIONS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0F172A' }}>
              Discover Your Next Adventure
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked destinations with personalized itineraries for the perfect escape
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((d, index) => (
              <div 
                key={d.name}
                className="transform transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DestinationCard d={d} onOpen={openDestination} />
              </div>
            ))}
          </div>
        </section>

        {/* AI Features Section */}
        <section className="max-w-7xl mx-auto mb-20">
          <div 
            className="rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <div className="p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-6">
                  <span className="text-2xl">🤖</span>
                  <span className="font-bold" style={{ color: '#2C74B3' }}>AI-POWERED TRAVEL PLANNING</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#0F172A' }}>
                  Why Choose Our Smart Platform?
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { 
                    title: 'Personalized Itineraries', 
                    desc: 'Custom plans based on your preferences and travel style',
                    icon: '🧭',
                    color: '#2C74B3'
                  },
                  { 
                    title: 'Real-time Optimization', 
                    desc: 'Dynamic adjustments based on weather and local events',
                    icon: '⚡',
                    color: '#6BBFF1'
                  },
                  { 
                    title: 'Local Insights', 
                    desc: 'Hidden gems and tips from local experts',
                    icon: '📍',
                    color: '#0EA5E9'
                  },
                  { 
                    title: 'Seamless Booking', 
                    desc: 'One-click reservations for all your travel needs',
                    icon: '💳',
                    color: '#0369A1'
                  },
                ].map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{
                      background: 'linear-gradient(145deg, #FFFFFF 0%, #F1F9FF 100%)',
                      border: '1px solid rgba(107, 191, 241, 0.2)'
                    }}
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ 
                        background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                        border: `1px solid ${feature.color}30`
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-4">
              <span className="text-sm font-semibold" style={{ color: '#2C74B3' }}>⭐ TRAVELER STORIES</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#0F172A' }}>
              Loved by Travelers Worldwide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Sofia L.', 
                role: 'Digital Nomad',
                text: 'The AI itinerary was spot-on! It saved us days of planning and showed us places we never would have found.',
                rating: 5,
                avatar: 'SL',
                color: '#6BBFF1'
              },
              { 
                name: 'Mark R.', 
                role: 'Adventure Traveler',
                text: 'Perfect balance of relaxation and adventure. The booking flow was seamless from start to finish.',
                rating: 5,
                avatar: 'MR',
                color: '#2C74B3'
              },
              { 
                name: 'Aisha K.', 
                role: 'Family Traveler',
                text: 'As a family of four, finding activities everyone enjoys is hard. This platform nailed it perfectly.',
                rating: 5,
                avatar: 'AK',
                color: '#0EA5E9'
              },
            ].map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="group transform transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div 
                  className="h-full p-8 rounded-3xl border relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
                    borderColor: 'rgba(107, 191, 241, 0.2)'
                  }}
                >
                  {/* Quote marks */}
                  <div className="absolute top-6 right-6 text-6xl opacity-5" style={{ color: testimonial.color }}>
                    "
                  </div>
                  
                  {/* Rating */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  
                  {/* Testimonial text */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4"
                      style={{ backgroundColor: testimonial.color }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  {/* Background pattern */}
                  <div 
                    className="absolute bottom-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{ 
                      background: `radial-gradient(circle, ${testimonial.color} 0%, transparent 70%)`,
                      transform: 'translate(30%, 30%)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      
      {selectedDest && <DestinationModal dest={selectedDest} onClose={closeDestination} />}
    </div>
  );
}