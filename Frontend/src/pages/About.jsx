import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlassCard from "../components/layout/GlassCard";
import "../styles/colors.css";
import AnimatedText from "../components/ui/AnimatedText";

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-page font-sans overflow-hidden" ref={containerRef}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-blue-100/10 to-sky-100/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-gradient-to-l from-sky-100/10 to-blue-100/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-white/5 to-blue-50/5 blur-3xl" />
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <header className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=2000&q=80&auto=format&fit=crop"
            alt="world horizon"
            className="w-full h-full object-cover transform scale-110"
            style={{ filter: 'brightness(0.85)' }}
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-white via-white/95 to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-6 h-6 rounded-full bg-white/20 animate-pulse" />
        <div className="absolute top-40 right-32 w-8 h-8 rounded-full bg-blue-300/20 animate-pulse delay-300" />
        <div className="absolute bottom-40 left-1/4 w-10 h-10 rounded-full bg-sky-200/10 animate-pulse delay-700" />

        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
          <div className="max-w-5xl w-full transform transition-all duration-1000">
            <div 
              className={`relative p-10 md:p-14 rounded-3xl backdrop-blur-xl border border-white/30 shadow-2xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(217,238,249,0.08) 100%)',
                boxShadow: '0 25px 50px rgba(15, 23, 42, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >
              {/* Decorative Border */}
              <div className="absolute inset-0 rounded-3xl border border-white/10" />
              
              <div className="text-center relative z-10">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                  <span className="text-sm font-semibold text-white">🌟 ABOUT US</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-white via-white/95 to-blue-100 bg-clip-text text-transparent">
                    About Travellio
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-100 via-white to-blue-50 bg-clip-text text-transparent">
                    AI Journey
                  </span>
                </h1>
                
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Where artificial intelligence meets human wanderlust to create 
                  perfectly personalized travel experiences.
                </p>
                
                {/* Animated Scroll Indicator */}
                <div className="mt-12 animate-bounce-slow">
                  <div className="flex flex-col items-center">
                    <span className="text-white/60 text-sm mb-2">Discover Our Story</span>
                    <div className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-2">
                      <div className="w-1.5 h-3 rounded-full bg-white/60 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 -mt-32 md:-mt-40 px-4 md:px-8 pb-32">
        {/* Mission Section */}
        <section className={`max-w-7xl mx-auto mb-24 transform transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              className="relative p-10 md:p-12 rounded-3xl overflow-hidden group transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                boxShadow: '0 20px 40px rgba(2,6,23,0.08)',
                border: '1px solid rgba(107, 191, 241, 0.15)'
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-sky-300 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-300 to-sky-200 rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-6">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-sm font-semibold" style={{ color: '#2C74B3' }}>OUR MISSION</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug" style={{ color: '#0F172A' }}>
                  <AnimatedText 
                    text="Make travel effortless, personalized and delightful" 
                    charDelay={15}
                    className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                  />
                </h2>
                
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  We combine travel expertise with advanced AI to curate personalized itineraries, 
                  surface hidden gems, optimize travel time and budgets, and make every trip feel 
                  effortlessly curated. Our mission is to bring joy back to travel planning.
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Human-Centered AI</div>
                    <div className="text-sm text-gray-600">Technology that understands human desires</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div 
                className="relative group transition-all duration-700 hover:scale-105"
                style={{ perspective: '1000px' }}
              >
                <div 
                  className="p-10 rounded-3xl backdrop-blur-xl border border-white/30 shadow-2xl transition-all duration-500 group-hover:rotate-1 group-hover:shadow-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(217,238,249,0.1) 100%)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="text-center transform transition-transform duration-500 group-hover:translateZ(20px)">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-white/20 to-blue-100/10 flex items-center justify-center text-7xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                      🌍
                    </div>
                    <div className="font-bold text-2xl mb-3 text-white">Global Intelligence</div>
                    <p className="text-white/80 text-sm">Real-time insights from 150+ countries</p>
                  </div>
                </div>
                
                {/* Floating Orbits */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full animate-spin-slow" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className={`max-w-7xl mx-auto mb-24 transform transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-6">
              <span className="text-2xl">⚡</span>
              <span className="font-bold" style={{ color: '#2C74B3' }}>WHAT WE DO</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0F172A' }}>
              <AnimatedText 
                text="Our Core Capabilities" 
                charDelay={20}
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
              />
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Leveraging AI to transform how you experience travel
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: '🧠', 
                title: 'Smart Planning', 
                text: 'AI-driven itineraries tailored to your preferences',
                color: '#2C74B3'
              },
              { 
                icon: '📍', 
                title: 'Local Picks', 
                text: 'Handpicked attractions & authentic dining',
                color: '#6BBFF1'
              },
              { 
                icon: '📅', 
                title: 'Optimized Dates', 
                text: 'Best times and seamless schedules',
                color: '#0EA5E9'
              },
              { 
                icon: '💳', 
                title: 'Budget Friendly', 
                text: 'Cost-aware suggestions and exclusive deals',
                color: '#0369A1'
              },
            ].map((capability, idx) => (
              <div 
                key={capability.title}
                className="group transform transition-all duration-500 hover:-translate-y-4"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div 
                  className="h-full p-8 rounded-3xl relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                    border: '1px solid rgba(107, 191, 241, 0.1)'
                  }}
                >
                  {/* Background Glow */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${capability.color}15 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Icon Container */}
                  <div 
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                    style={{ 
                      background: `linear-gradient(135deg, ${capability.color}15 0%, ${capability.color}05 100%)`,
                      border: `1px solid ${capability.color}20`
                    }}
                  >
                    {capability.icon}
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-xl font-bold text-center mb-4" style={{ color: '#0F172A' }}>
                    {capability.title}
                  </h4>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {capability.text}
                  </p>
                  
                  {/* Arrow Indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-sky-100 flex items-center justify-center">
                      <span className="text-gray-600">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className={`max-w-7xl mx-auto mb-24 transform transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-6">
              <span className="text-2xl">🤖</span>
              <span className="font-bold" style={{ color: '#2C74B3' }}>MULTI-AGENT AI TECHNOLOGY</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0F172A' }}>
              <AnimatedText 
                text="Intelligent Collaboration" 
                charDelay={20}
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
              />
            </h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
              Multiple specialized AI agents work in harmony to analyze, plan, and optimize every aspect of your journey
            </p>
          </div>

          <div className="relative">
            {/* Connection Lines (Desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-sky-200 to-blue-200 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {[
                { 
                  title: 'City Analysis', 
                  description: 'Understands city dynamics & patterns',
                  icon: '🏙️',
                  color: '#2C74B3'
                },
                { 
                  title: 'Attractions', 
                  description: 'Curates must-see spots & hidden gems',
                  icon: '🌟',
                  color: '#6BBFF1'
                },
                { 
                  title: 'Accommodation', 
                  description: 'Finds perfect stays for your needs',
                  icon: '🏨',
                  color: '#0EA5E9'
                },
                { 
                  title: 'Itinerary', 
                  description: 'Builds optimal daily schedules',
                  icon: '📝',
                  color: '#38BDF8'
                },
                { 
                  title: 'Budget', 
                  description: 'Manages costs & finds deals',
                  icon: '💰',
                  color: '#0369A1'
                },
              ].map((agent, idx) => (
                <div 
                  key={agent.title}
                  className="group transform transition-all duration-500 hover:-translate-y-4"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div 
                    className="p-8 rounded-3xl text-center relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                      border: '1px solid rgba(107, 191, 241, 0.15)'
                    }}
                  >
                    {/* Animated Background */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${agent.color}10 0%, transparent 70%)`,
                      }}
                    />
                    
                    {/* Agent Icon */}
                    <div 
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                      style={{ 
                        background: `linear-gradient(135deg, ${agent.color}15 0%, ${agent.color}05 100%)`,
                        border: `1px solid ${agent.color}20`
                      }}
                    >
                      {agent.icon}
                    </div>
                    
                    {/* Agent Info */}
                    <h4 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{agent.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{agent.description}</p>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-medium" style={{ color: agent.color }}>Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className={`max-w-7xl mx-auto mb-24 transform transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-sky-400/5" />
              <img 
                src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80&auto=format&fit=crop"
                alt="Our vision for travel"
                className="w-full h-full object-cover rounded-3xl transform transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />
            </div>
            
            <div 
              className="relative p-10 md:p-12 rounded-3xl overflow-hidden group"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                boxShadow: '0 20px 40px rgba(2,6,23,0.08)',
                border: '1px solid rgba(107, 191, 241, 0.15)'
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-400 to-sky-300 rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-6">
                  <span className="text-sm font-semibold" style={{ color: '#2C74B3' }}>OUR VISION</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-snug" style={{ color: '#0F172A' }}>
                  Redefining Travel Planning
                </h3>
                
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  We envision a world where planning your dream trip is as delightful as the trip itself. 
                  Through intelligent automation and human-centered design, we're making global travel 
                  accessible, personalized, and magical for everyone.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Seamless', value: '100%' },
                    { label: 'Personalized', value: 'AI-Driven' },
                    { label: 'Human-Centered', value: 'Always' },
                  ].map((item) => (
                    <div 
                      key={item.label}
                      className="p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(248,250,252,0.4) 100%)',
                        border: '1px solid rgba(107, 191, 241, 0.1)'
                      }}
                    >
                      <div className="text-2xl font-bold mb-1" style={{ color: '#2C74B3' }}>{item.value}</div>
                      <div className="text-sm font-medium text-gray-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={`max-w-7xl mx-auto mb-24 transform transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 mb-6">
              <span className="text-2xl">👥</span>
              <span className="font-bold" style={{ color: '#2C74B3' }}>MEET THE TEAM</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0F172A' }}>
              <AnimatedText 
                text="Passionate Minds Behind Travellio" 
                charDelay={15}
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
              />
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A diverse team of travel enthusiasts, AI experts, and experience designers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: 'Alex Morgan', 
                role: 'AI Architect',
                desc: 'Machine learning & travel pattern analysis',
                avatar: 'AM'
              },
              { 
                name: 'Sarah Chen', 
                role: 'Experience Designer',
                desc: 'User journey & interface design',
                avatar: 'SC'
              },
              { 
                name: 'Marcus Rivera', 
                role: 'Travel Expert',
                desc: 'Global destination insights',
                avatar: 'MR'
              },
              { 
                name: 'Priya Sharma', 
                role: 'Product Lead',
                desc: 'Strategy & roadmap development',
                avatar: 'PS'
              },
            ].map((member, idx) => (
              <div 
                key={member.name}
                className="group transform transition-all duration-500 hover:-translate-y-4"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div 
                  className="h-full p-8 rounded-3xl text-center relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                    border: '1px solid rgba(107, 191, 241, 0.1)'
                  }}
                >
                  {/* Background Glow */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, #2C74B310 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Avatar */}
                  <div className="relative z-10">
                    <div 
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-sky-300 flex items-center justify-center text-white text-2xl font-bold transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                    >
                      {member.avatar}
                    </div>
                    
                    {/* Member Info */}
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#0F172A' }}>{member.name}</h4>
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                      style={{ 
                        background: `linear-gradient(135deg, #6BBFF115 0%, #2C74B310 100%)`,
                        color: '#2C74B3'
                      }}
                    >
                      {member.role}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={`max-w-5xl mx-auto transform transition-all duration-1000 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div 
            className="relative p-12 md:p-16 rounded-3xl overflow-hidden text-center group"
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
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Travel Experience?
              </h3>
              
              <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Let Travellio AI craft your perfect journey. Personalized, seamless, and magical.
              </p>
              
              <a 
                href="/preferences" 
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-[#2C74B3] font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
              >
                <span>Start Your Journey</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </a>
              
              <div className="mt-10 text-white/70 text-sm">
                <span className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                  Join 50,000+ travelers who found their perfect trip
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}