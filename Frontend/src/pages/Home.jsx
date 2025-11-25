import React from "react";
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
  },
  {
    name: "Santorini, Greece",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=60&auto=format&fit=crop",
    distance: "7,845 km",
    bestMonth: "Sep",
  },
  {
    name: "Maldives",
    img: "https://images.unsplash.com/photo-1505765051923-4c0a7f2f6e7f?w=1200&q=60&auto=format&fit=crop",
    distance: "4,560 km",
    bestMonth: "Nov",
  },
  {
    name: "Amalfi Coast, Italy",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=60&auto=format&fit=crop",
    distance: "8,210 km",
    bestMonth: "Jun",
  },
  {
    name: "Phuket, Thailand",
    img: "https://images.unsplash.com/photo-1506801310323-534be5e7f4d3?w=1200&q=60&auto=format&fit=crop",
    distance: "3,120 km",
    bestMonth: "Feb",
  },
  {
    name: "Bora Bora, French Polynesia",
    img: "https://images.unsplash.com/photo-1505765051923-4c0a7f2f6e7f?w=1200&q=60&auto=format&fit=crop",
    distance: "12,430 km",
    bestMonth: "Aug",
  },
];

function DestinationCard({ d }) {
  return (
    <div className="relative rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-2xl bg-card">
      <img src={d.img} alt={d.name} className="w-full h-48 object-cover" />
      <div className="p-4 bg-white/90 backdrop-blur-sm text-slate-black absolute bottom-0 left-0 right-0 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold" style={{ color: 'var(--color-slate-black)' }}>{d.name}</div>
          <div className="text-sm opacity-70">{d.distance}</div>
        </div>
        <div className="badge-warm text-xs px-3 py-1 rounded-full font-semibold">{d.bestMonth}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans antialiased bg-page" style={{ color: 'var(--color-slate-black)' }}>
      <Navbar />
      <header className="relative">
        {/* Hero background with fade */}
        <div className="relative h-screen w-full overflow-hidden">
          {/* Hero image */}
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop"
            alt="ocean"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/15" />

          {/* Bottom fade to white gradient */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(217,238,249,0.6) 60%, #FFFFFF 100%)'
            }}
          />

          {/* Animated airplane path (SVG) */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 80 C 200 10, 400 120, 800 60" stroke="white" strokeWidth="2" fill="none" strokeDasharray="6 6" />
          </svg>

          {/* Center glass search card */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-4xl w-full animate-fade-in-up">
              <div 
                className="rounded-3xl border border-white/30 p-6 md:p-10" 
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(15, 23, 42, 0.1)'
                }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Plan your perfect getaway
                </h1>
                <p className="text-lg mb-6" style={{ color: 'var(--color-slate-black)', opacity: 0.8 }}>
                  Smart itineraries and curated experiences powered by AI
                </p>

                <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="text-xs uppercase opacity-70" style={{ color: 'var(--color-slate-black)' }}>Destination</label>
                    <input 
                      className="mt-1 w-full rounded-xl p-3 outline-none bg-search-glass" 
                      placeholder="Where are you going?" 
                      style={{ color: 'var(--color-slate-black)' }}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase opacity-70" style={{ color: 'var(--color-slate-black)' }}>Dates</label>
                    <input 
                      className="mt-1 w-full rounded-xl p-3 outline-none bg-search-glass" 
                      placeholder="Flexible dates"
                      style={{ color: 'var(--color-slate-black)' }}
                    />
                  </div>
                  <div>
                    <button 
                      type="button" 
                      onClick={() => navigate('/preferences')}
                      className="w-full rounded-xl p-3 btn-primary font-semibold shadow-md"
                    >
                      Search
                    </button>
                  </div>
                </form>
                <div className="mt-4 text-sm opacity-70" style={{ color: 'var(--color-slate-black)' }}>
                  Or try: <span className="underline text-primary cursor-pointer" onClick={() => navigate('/preferences')}>Bali, Santorini, Maldives</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="-mt-28 relative z-10 px-6 md:px-12 pb-20">
        <section id="destinations" className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--color-slate-black)' }}>
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.slice(0,6).map((d) => (
              <DestinationCard key={d.name} d={d} />
            ))}
          </div>
        </section>

        <section className="mt-16 max-w-7xl mx-auto p-8 rounded-2xl" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D9EEF9 100%)' }}>
          <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--color-slate-black)' }}>
            Why use our AI?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Personalized itineraries', icon: '🧭' },
              { title: 'Real-time optimization', icon: '⚡' },
              { title: 'Local tips & safety', icon: '📌' },
              { title: 'Seamless bookings', icon: '💳' },
            ].map((c) => (
              <div key={c.title} className="bg-card rounded-xl p-6 flex flex-col items-center text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="font-semibold" style={{ color: 'var(--color-slate-black)' }}>{c.title}</div>
                <div className="text-sm mt-2 opacity-70">{`Smart ${c.title.toLowerCase()}`}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--color-slate-black)' }}>
            What travelers say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sofia L.', text: 'The itinerary was perfect — saved us so much time and uncovered hidden gems.' },
              { name: 'Mark R.', text: 'Beautiful recommendations and smooth booking flow. Highly recommended.' },
              { name: 'Aisha K.', text: 'Lovely designs and spot-on suggestions for food and activities.' },
            ].map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-6">
                <div className="text-sm opacity-70 mb-3">"{t.text}"</div>
                <div className="font-semibold" style={{ color: 'var(--color-ocean-blue)' }}>{t.name}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
