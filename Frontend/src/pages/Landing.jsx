import React from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  GlobeAsiaAustraliaIcon,
  MapIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function Landing() {
  return (
    <div className="gradient-sky text-white min-h-screen overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 glow-sky rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 glow-ocean rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 glow-warm rounded-full blur-3xl animate-pulse" />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: "rgba(var(--color-sky-blue-rgb), 0.35)" }}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{ 
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 15 + 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 w-full flex justify-between items-center px-6 md:px-10 py-6 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-extrabold tracking-wide"
        >
          <span className="text-gradient-sky">
            Travel
          </span>
          <span className="text-white">AI</span>
        </motion.h1>

        <nav className="hidden md:flex space-x-8 text-lg">
          {[
            { href: "#features", label: "Features" },
            { href: "#how", label: "How it Works" },
            { href: "#about", label: "About" },
          ].map((link) => (
            <motion.a 
              key={link.href}
              whileHover={{ scale: 1.05, color: "var(--color-sky-blue)" }}
              href={link.href} 
              className="hover:text-[var(--color-sky-blue)] transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/preferences"
          className="px-5 py-2 md:px-6 md:py-3 rounded-xl btn-secondary text-base md:text-lg shadow-lg shadow-[rgba(var(--color-coral-orange-rgb),0.4)] font-semibold"
        >
          Start Planning
        </motion.a>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-10 mt-10 md:mt-20 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left */}
        <div className="md:w-1/2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold border border-[var(--color-sky-blue)] text-[var(--color-sky-blue)] bg-[rgba(var(--color-sky-blue-rgb),0.15)] mb-6"
            >
              ✨ AI-Powered Travel Planning
            </motion.span>
            
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Your{" "}
              <span className="text-gradient-sky animate-gradient">
                Dream Journey
              </span>
              <br />
              Starts Here
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/85 max-w-xl leading-relaxed"
          >
            Get personalized itineraries, real-time costs, hotel suggestions,
            food budget, local experiences, weather insights, and more — all in seconds.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/preferences"
              className="px-8 py-4 rounded-xl btn-primary text-lg shadow-lg shadow-[rgba(var(--color-ocean-blue-rgb),0.4)] font-semibold text-center"
            >
              Plan My Trip 🚀
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#features"
              className="px-8 py-4 rounded-xl btn-secondary text-lg font-semibold text-center"
            >
              Explore Features
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-8 mt-12 pt-8 border-t border-white/15"
          >
            {[
              { num: "10K+", label: "Happy Travelers" },
              { num: "50+", label: "Countries" },
              { num: "4.9/5", label: "User Rating" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-gradient-sunset">
                  {stat.num}
                </p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - Floating Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="md:w-1/2 relative perspective-1000"
        >
          <motion.div 
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="gradient-ocean-glass p-6 rounded-3xl border border-white/20 relative overflow-hidden"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
            
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="travel"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
            
            {/* Overlay Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-8 right-8 gradient-ocean-glass p-4 rounded-xl shadow-glass border border-white/30 text-[var(--color-deep-navy)]"
            >
              <p className="font-semibold">🌴 Bali, Indonesia</p>
              <p className="text-sm text-[var(--color-deep-navy)]/70 mt-1">5 Days • $1,200 • Adventure</p>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-gradient-to-br from-[var(--color-sky-blue)] to-[var(--color-ocean-blue)] p-5 rounded-2xl shadow-2xl shadow-[rgba(var(--color-ocean-blue-rgb),0.35)]"
          >
            <RocketLaunchIcon className="w-10 h-10" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[var(--color-sunset-yellow)] to-[var(--color-coral-orange)] p-5 rounded-2xl shadow-2xl shadow-[rgba(var(--color-coral-orange-rgb),0.35)]"
          >
            <MapIcon className="w-10 h-10" />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute top-1/2 -right-4 bg-gradient-to-br from-[var(--color-sunset-yellow)] to-[var(--color-coral-orange)] p-4 rounded-full shadow-xl shadow-[rgba(var(--color-sunset-yellow-rgb),0.4)]"
          >
            <SparklesIcon className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 md:px-10 py-24 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient-sky">TravelAI</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the future of travel planning with AI-powered insights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <SparklesIcon className="w-12 h-12" />,
              title: "AI-Generated Itineraries",
              desc: "Get day-by-day plans fully customized to your tastes & budget.",
              gradient: "from-[var(--color-sky-blue)] to-[var(--color-ocean-blue)]"
            },
            {
              icon: <GlobeAsiaAustraliaIcon className="w-12 h-12" />,
              title: "Global Travel Data",
              desc: "Ticket prices, food cost, hotels, activities — everything in one place.",
              gradient: "from-[var(--color-ocean-blue)] to-[var(--color-deep-navy)]"
            },
            {
              icon: <RocketLaunchIcon className="w-12 h-12" />,
              title: "Lightning Fast",
              desc: "Generate a full travel plan in under 10 seconds.",
              gradient: "from-[var(--color-sunset-yellow)] to-[var(--color-coral-orange)]"
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 20px 60px rgba(var(--color-sky-blue-rgb), 0.3)"
              }}
              className="group p-8 gradient-ocean-glass rounded-2xl border border-white/20 shadow-glass space-y-4 relative overflow-hidden text-[var(--color-deep-navy)]"
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`text-transparent bg-gradient-to-br ${f.gradient} bg-clip-text flex justify-center`}
              >
                {f.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-[var(--color-deep-navy)]">{f.title}</h3>
              <p className="text-[var(--color-deep-navy)]/75">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="relative z-10 px-6 md:px-10 py-20">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          How it{" "}
          <span className="text-gradient-sky">
            Works
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-ocean-blue)] via-[var(--color-sky-blue)] to-[var(--color-sunset-yellow)] -z-10 opacity-30" />
          
          {[
            {
              step: "01",
              title: "Enter Preferences",
              desc: "Destination, dates, budget, interests, and comfort level.",
              icon: "📝",
              color: "from-[var(--color-sky-blue)] to-[var(--color-ocean-blue)]"
            },
            {
              step: "02",
              title: "AI Generates Plan",
              desc: "Hotels, food, itinerary, attractions, pocket money, and weather.",
              icon: "🤖",
              color: "from-[var(--color-ocean-blue)] to-[var(--color-deep-navy)]"
            },
            {
              step: "03",
              title: "Download & Travel",
              desc: "Instant printable PDF with all details included.",
              icon: "✈️",
              color: "from-[var(--color-sunset-yellow)] to-[var(--color-coral-orange)]"
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-8 gradient-ocean-glass rounded-2xl border border-white/15 shadow-glass group text-[var(--color-deep-navy)]"
            >
              {/* Step Number Badge */}
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center font-bold text-white shadow-lg`}>
                {i + 1}
              </div>
              
              <div className="text-7xl mb-4 text-center group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              
              <h3 className="text-2xl font-bold mt-4 text-center">{s.title}</h3>
              <p className="text-[var(--color-deep-navy)]/75 mt-2 text-center leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 md:px-10 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto gradient-ocean-glass rounded-3xl p-12 border border-white/30 text-center relative overflow-hidden text-[var(--color-deep-navy)]"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 gradient-sky opacity-20 animate-gradient" />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 relative z-10"
          >
            Ready to Start Your Adventure?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--color-deep-navy)]/80 mb-8 max-w-2xl mx-auto relative z-10"
          >
            Join thousands of travelers who trust TravelAI to plan their perfect journey
          </motion.p>
          
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/preferences"
            className="relative z-10 inline-block px-10 py-5 btn-secondary text-xl rounded-xl font-bold shadow-xl shadow-[rgba(var(--color-coral-orange-rgb),0.4)]"
          >
            Start Planning Now 🎉
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center text-white/70 py-10 border-t border-white/20 backdrop-blur-sm">
        <p className="text-lg">
          © 2025 TravelAI — Designed for wanderers
        </p>
        <div className="flex justify-center gap-6 mt-4">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a key={item} href="#" className="hover:text-[var(--color-sky-blue)] transition-colors">
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
