import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/layout/GlassCard";
import "../styles/colors.css";

export default function About() {
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
            <GlassCard className="p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: "var(--color-ocean-blue)", fontFamily: 'Poppins, sans-serif' }}>
                About Travellio AI
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
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div style={{ background: 'linear-gradient(180deg,#FFFFFF 0%, #D9EEF9 100%)' }} className="p-8 rounded-2xl">
              <div className="mb-4 text-sm font-semibold text-sky-600">Our Mission</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-deep-navy)' }}>
                Make travel effortless, personalized and delightful
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We combine travel expertise with advanced AI to curate personalized itineraries, surface hidden gems,
                optimize travel time and budgets, and make every trip feel effortlessly curated. Our mission is to bring
                joy back to travel planning.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <GlassCard className="p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <div className="font-semibold">Global reach</div>
                  <p className="text-sm text-gray-600 mt-2">Insights and local tips from around the world</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="max-w-7xl mx-auto mb-12">
          <h3 className="text-2xl font-bold mb-6">What we do</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🧠', title: 'Smart Planning', text: 'AI-driven itineraries tailored to you' },
              { icon: '📍', title: 'Local Picks', text: 'Handpicked attractions & restaurants' },
              { icon: '📅', title: 'Optimized Dates', text: 'Best times and schedules' },
              { icon: '💳', title: 'Budget Friendly', text: 'Cost-aware suggestions and deals' },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="text-4xl mb-3">{c.icon}</div>
                <div className="font-semibold text-lg" style={{ color: 'var(--color-ocean-blue)' }}>{c.title}</div>
                <div className="text-sm text-gray-600 mt-2">{c.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Technology */}
        <section className="max-w-7xl mx-auto mb-12">
          <h3 className="text-2xl font-bold mb-6">Our Technology — Multi-Agent AI</h3>
          <p className="text-gray-600 mb-6">Multiple specialized agents work together to analyze cities, find attractions, book hotels, plan itineraries, and manage budgets.</p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { title: 'City Analysis', color: 'bg-sky-100' },
              { title: 'Attractions', color: 'bg-sky-50' },
              { title: 'Hotels', color: 'bg-white' },
              { title: 'Itinerary', color: 'bg-white' },
              { title: 'Budget', color: 'bg-sky-50' },
            ].map((m) => (
              <div key={m.title} className="p-6 rounded-2xl shadow-md text-center" style={{ border: '1px solid rgba(44,116,179,0.07)' }}>
                <div className="text-3xl mb-3">🤖</div>
                <div className="font-semibold mb-1">{m.title}</div>
                <div className="text-sm text-gray-600">Specialized AI agent for {m.title.toLowerCase()}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="p-8" style={{ background: 'linear-gradient(180deg,#F8FAFC 0%, #D9EEF9 100%)' }}>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Making world travel simple, intuitive, and personalized through AI. We envision a world where planning
                your dream trip is as delightful as the trip itself.
              </p>
              <p className="font-semibold" style={{ color: 'var(--color-ocean-blue)' }}>Seamless • Personalized • Human-centered</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80&auto=format&fit=crop" alt="vision" className="w-full h-full object-cover rounded-2xl shadow-md" />
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-7xl mx-auto mb-12">
          <h3 className="text-2xl font-bold mb-6">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex flex-col items-center text-center">
                <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt={`team-${i}`} className="w-24 h-24 rounded-full mb-4 shadow-md" />
                <div className="font-semibold">Member {i}</div>
                <div className="text-sm text-gray-600">Role</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto text-center mb-16">
          <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #6BBFF1, #2C74B3)' }}>
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Plan Your Next Trip?</h3>
            <p className="text-white/90 mb-6">Let Travellio AI craft a personalized itinerary for your dream getaway.</p>
            <a href="/preferences" className="px-8 py-3 rounded-2xl bg-white text-[#2C74B3] font-semibold">Plan with Travellio AI</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
