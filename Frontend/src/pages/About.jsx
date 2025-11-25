import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/layout/GlassCard";
import "../styles/colors.css";
import AnimatedText from "../components/ui/AnimatedText";

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen bg-page font-sans">
      <Navbar />

      {/* Hero */}
      <header className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&q=80&auto=format&fit=crop"
          alt="world horizon"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* dark overlay + fade to sky */}
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #D9EEF9 40%, #FFFFFF 100%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-3xl w-full">
            <GlassCard className={`p-8 text-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: "var(--color-ocean-blue)", fontFamily: 'Poppins, sans-serif' }}>
                <AnimatedText text={"About Travellio AI"} />
              </h1>
              <p className="text-lg text-slate-700/90">
                Your intelligent companion for planning perfect journeys.
              </p>
            </GlassCard>
          </div>
        </div>
      </header>

      <main className="-mt-24 relative z-10 px-6 md:px-12 pb-20">
        {/* Mission Section */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div style={{ background: 'linear-gradient(180deg,#FFFFFF 0%, #D9EEF9 100%)', boxShadow: '0 8px 30px rgba(2,6,23,0.06)' }} className="p-8 rounded-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <div className="mb-4 text-sm font-semibold text-sky-600">Our Mission</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-deep-navy)' }}>
                <AnimatedText text={"Make travel effortless, personalized and delightful"} charDelay={18} />
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We combine travel expertise with advanced AI to curate personalized itineraries, surface hidden gems,
                optimize travel time and budgets, and make every trip feel effortlessly curated. Our mission is to bring
                joy back to travel planning.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <GlassCard className="p-8 transition-all duration-500 hover:scale-110 hover:rotate-2">
                <div className="text-center">
                  <div className="text-6xl mb-4 transition-transform duration-500 hover:scale-125">🗺️</div>
                  <div className="font-semibold">Global reach</div>
                  <p className="text-sm text-gray-600 mt-2">Insights and local tips from around the world</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold mb-6"><AnimatedText text={"What we do"} charDelay={26} /></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
              { icon: '🧠', title: 'Smart Planning', text: 'AI-driven itineraries tailored to you' },
              { icon: '📍', title: 'Local Picks', text: 'Handpicked attractions & restaurants' },
              { icon: '📅', title: 'Optimized Dates', text: 'Best times and schedules' },
              { icon: '💳', title: 'Budget Friendly', text: 'Cost-aware suggestions and deals' },
            ].map((c, idx) => (
              <div key={c.title} className="bg-white rounded-2xl p-6 shadow-md text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl" style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className="text-4xl mb-3 transition-transform duration-300 hover:scale-125">{c.icon}</div>
                <div className="font-semibold text-lg" style={{ color: 'var(--color-ocean-blue)' }}><AnimatedText text={c.title} charDelay={20} /></div>
                <div className="text-sm text-gray-600 mt-2">{c.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Technology */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold mb-6">Our Technology — Multi-Agent AI</h3>
          <p className="text-gray-600 mb-6">Multiple specialized agents work together to analyze cities, find attractions, book hotels, plan itineraries, and manage budgets.</p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { title: 'City Analysis', color: 'bg-sky-100' },
              { title: 'Attractions', color: 'bg-sky-50' },
              { title: 'Hotels', color: 'bg-white' },
              { title: 'Itinerary', color: 'bg-white' },
              { title: 'Budget', color: 'bg-sky-50' },
            ].map((m, idx) => (
              <div key={m.title} className="p-6 rounded-2xl shadow-md text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-xl hover:bg-sky-50" style={{ border: '1px solid rgba(44,116,179,0.07)', transitionDelay: `${idx * 60}ms` }}>
                <div className="text-3xl mb-3 transition-transform duration-300 hover:rotate-12 hover:scale-125">🤖</div>
                <div className="font-semibold mb-1">{m.title}</div>
                <div className="text-sm text-gray-600">Specialized AI agent for {m.title.toLowerCase()}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl" style={{ background: 'linear-gradient(180deg,#F8FAFC 0%, #D9EEF9 100%)', boxShadow: '0 8px 30px rgba(2,6,23,0.06)' }}>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Making world travel simple, intuitive, and personalized through AI. We envision a world where planning
                your dream trip is as delightful as the trip itself.
              </p>
              <p className="font-semibold" style={{ color: 'var(--color-ocean-blue)' }}>Seamless • Personalized • Human-centered</p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80&auto=format&fit=crop" alt="vision" className="w-full h-full object-cover rounded-2xl shadow-md transition-transform duration-700 hover:scale-110" />
            </div>
          </div>
        </section>

        {/* Team */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold mb-6">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl" style={{ transitionDelay: `${i * 60}ms` }}>
                <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt={`team-${i}`} className="w-24 h-24 rounded-full mb-4 shadow-md transition-all duration-500 hover:scale-110 hover:shadow-xl" />
                <div className="font-semibold">Member {i}</div>
                <div className="text-sm text-gray-600">Role</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={`max-w-7xl mx-auto text-center mb-16 transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl" style={{ background: 'linear-gradient(135deg, #6BBFF1, #2C74B3)', boxShadow: '0 8px 30px rgba(44,116,179,0.3)' }}>
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Plan Your Next Trip?</h3>
            <p className="text-white/90 mb-6">Let Travellio AI craft a personalized itinerary for your dream getaway.</p>
            <a href="/preferences" className="inline-block px-8 py-3 rounded-2xl bg-white text-[#2C74B3] font-semibold transition-all duration-300 hover:scale-110 hover:shadow-xl">Plan with Travellio AI</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
