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
    <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white min-h-screen overflow-hidden relative">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/30 rounded-full"
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
          <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Travel
          </span>
          <span className="text-white">AI</span>
        </motion.h1>

        <nav className="hidden md:flex space-x-8 text-lg">
          <motion.a 
            whileHover={{ scale: 1.05, color: "#38bdf8" }}
            href="#features" 
            className="hover:text-sky-400 transition-colors"
          >
            Features
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05, color: "#38bdf8" }}
            href="#how" 
            className="hover:text-sky-400 transition-colors"
          >
            How it Works
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05, color: "#38bdf8" }}
            href="#about" 
            className="hover:text-sky-400 transition-colors"
          >
            About
          </motion.a>
        </nav>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/preferences"
          className="px-5 py-2 md:px-6 md:py-3 rounded-xl bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-base md:text-lg shadow-lg shadow-sky-500/50 font-semibold"
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
              className="inline-block px-4 py-2 bg-sky-500/20 border border-sky-500/50 rounded-full text-sm font-semibold text-sky-300 mb-6"
            >
              ✨ AI-Powered Travel Planning
            </motion.span>
            
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Your{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
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
            className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
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
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(56, 189, 248, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="/preferences"
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-lg rounded-xl hover:from-sky-600 hover:to-cyan-600 shadow-xl shadow-sky-500/30 font-semibold text-center"
            >
              Plan My Trip 🚀
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(14, 116, 144, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              href="#features"
              className="px-8 py-4 border-2 border-sky-500 rounded-xl text-lg hover:bg-sky-800/20 backdrop-blur-sm font-semibold text-center"
            >
              Explore Features
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-8 mt-12 pt-8 border-t border-white/10"
          >
            {[
              { num: "10K+", label: "Happy Travelers" },
              { num: "50+", label: "Countries" },
              { num: "4.9/5", label: "User Rating" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.num}
                </p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
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
            className="bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-2xl border border-white/20 relative overflow-hidden"
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
              className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl p-4 rounded-xl shadow-xl"
            >
              <p className="text-gray-800 font-semibold">🌴 Bali, Indonesia</p>
              <p className="text-sm text-gray-600 mt-1">5 Days • $1,200 • Adventure</p>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-gradient-to-br from-sky-500 to-cyan-500 p-5 rounded-2xl shadow-2xl shadow-sky-500/50"
          >
            <RocketLaunchIcon className="w-10 h-10" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-500 to-pink-500 p-5 rounded-2xl shadow-2xl shadow-purple-500/50"
          >
            <MapIcon className="w-10 h-10" />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute top-1/2 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full shadow-xl shadow-yellow-500/50"
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
            Why Choose{" "}
            <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
              TravelAI
            </span>
            ?
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
              gradient: "from-sky-500 to-cyan-500"
            },
            {
              icon: <GlobeAsiaAustraliaIcon className="w-12 h-12" />,
              title: "Global Travel Data",
              desc: "Ticket prices, food cost, hotels, activities — everything in one place.",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              icon: <RocketLaunchIcon className="w-12 h-12" />,
              title: "Lightning Fast",
              desc: "Generate a full travel plan in under 10 seconds.",
              gradient: "from-orange-500 to-yellow-500"
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
                boxShadow: "0 20px 60px rgba(56, 189, 248, 0.3)"
              }}
              className="group p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 shadow-xl backdrop-blur-xl space-y-4 relative overflow-hidden"
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
              <h3 className="text-2xl font-bold">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
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
          <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
            Works
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 -z-10 opacity-20" />
          
          {[
            {
              step: "01",
              title: "Enter Preferences",
              desc: "Destination, dates, budget, interests, and comfort level.",
              icon: "📝",
              color: "from-sky-500 to-cyan-500"
            },
            {
              step: "02",
              title: "AI Generates Plan",
              desc: "Hotels, food, itinerary, attractions, pocket money, and weather.",
              icon: "🤖",
              color: "from-purple-500 to-pink-500"
            },
            {
              step: "03",
              title: "Download & Travel",
              desc: "Instant printable PDF with all details included.",
              icon: "✈️",
              color: "from-orange-500 to-yellow-500"
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm group"
            >
              {/* Step Number Badge */}
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center font-bold text-white shadow-lg`}>
                {i + 1}
              </div>
              
              <div className="text-7xl mb-4 text-center group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              
              <h3 className="text-2xl font-bold mt-4 text-center">{s.title}</h3>
              <p className="text-gray-300 mt-2 text-center leading-relaxed">{s.desc}</p>
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
          className="max-w-4xl mx-auto bg-gradient-to-r from-sky-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center relative overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-pink-500/10 animate-gradient" />
          
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
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10"
          >
            Join thousands of travelers who trust TravelAI to plan their perfect journey
          </motion.p>
          
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(56, 189, 248, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            href="/preferences"
            className="relative z-10 inline-block px-10 py-5 bg-gradient-to-r from-sky-500 to-purple-500 text-xl rounded-xl font-bold shadow-2xl shadow-sky-500/50"
          >
            Start Planning Now 🎉
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-400 py-10 border-t border-white/10 backdrop-blur-sm">
        <p className="text-lg">
          © 2025 TravelAI — Designed with ❤️ for travelers
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-sky-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-sky-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-sky-400 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
