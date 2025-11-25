import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/colors.css";

const steps = ["Source & Destination", "Dates", "Travelers", "Budget", "Interests"];

const ALL_INTERESTS = [
  { id: "nature", label: "Nature" },
  { id: "museum", label: "Museums" },
  { id: "adventure", label: "Adventure" },
  { id: "shopping", label: "Shopping" },
  { id: "food", label: "Food" },
  { id: "nightlife", label: "Nightlife" },
  { id: "beach", label: "Beach" },
  { id: "culture", label: "Culture" },
];

export default function PreferencesPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    source: "",
    destination: "",
    startDate: "",
    endDate: "",
    adults: 2,
    children: 0,
    infants: 0,
    budgetPct: 50, // 0-100
    interests: [],
  });

  const progress = ((step + 1) / steps.length) * 100;
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setParallax(Math.min(40, window.scrollY * 0.12));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const budgetAmount = useMemo(() => {
    // map 0-100 to $20 - $500 per day
    const min = 20;
    const max = 500;
    return Math.round(min + (data.budgetPct / 100) * (max - min));
  }, [data.budgetPct]);

  const parallaxTransform = `translateY(${parallax}px)`;
  const bubbleLeft = `calc(${data.budgetPct}% - 28px)`;

  function update(updates) {
    setData((d) => ({ ...d, ...updates }));
  }

  function toggleInterest(id) {
    update({
      interests: data.interests.includes(id) ? data.interests.filter((i) => i !== id) : [...data.interests, id],
    });
  }

  function next() {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else {
      console.log("Preferences submitted", data);
      navigate("/trip-summary");
    }
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #D9EEF9 60%, #6BBFF1 100%)" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative w-full h-[44vh] md:h-[56vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=60&auto=format&fit=crop"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #D9EEF9 55%, #FFFFFF 100%)" }} />
        <div className="absolute inset-0 flex items-end justify-center pb-8">
          <div className="max-w-3xl w-full px-6">
            <div className="backdrop-blur-[20px] bg-white/30 rounded-full px-6 py-3 shadow-md mx-auto text-center" style={{ border: '1px solid rgba(255,255,255,0.5)' }}>
              <h1 className="text-lg md:text-xl font-semibold" style={{ color: '#2C74B3', fontFamily: 'Poppins, sans-serif' }}>Tell Us What You Prefer</h1>
              <p className="text-sm text-slate-700/80">We’ll craft a personalized trip based on your tastes, budget and dates.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="-mt-28 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-4 items-center">
                {steps.map((s, i) => (
                  <div key={s} className={`text-sm font-semibold ${i <= step ? "text-sky-700" : "text-gray-400"}`}>
                    {s}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">Step {step + 1} of {steps.length}</div>
            </div>

            <div className="h-2 bg-white/50 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg,#6BBFF1,#2C74B3)" }}
              />
            </div>
          </div>

          {/* Card */}
          <div className="relative">
            {/* layered floating images behind the card */}
            <div className="pointer-events-none absolute -top-8 left-6 right-6 md:left-12 md:right-12 flex items-center justify-center">
              <div className="relative w-full max-w-5xl h-44 md:h-56">
                <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=40&auto=format&fit=crop" alt="layer1" className="absolute rounded-2xl opacity-30 blur-sm transform -translate-x-6 -translate-y-2" style={{ width: '34%', left: 0 }} />
                <img src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=40&auto=format&fit=crop" alt="layer2" className="absolute rounded-2xl opacity-25 blur-sm transform translate-x-6 translate-y-4" style={{ width: '38%', right: 0 }} />
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c0?w=900&q=40&auto=format&fit=crop" alt="layer3" className="absolute rounded-2xl opacity-20 blur-md transform translate-x-0 translate-y-12 left-1/3" style={{ width: '30%' }} />
              </div>
            </div>

            <div
              className="relative bg-white/40 backdrop-blur-[20px] rounded-3xl p-6 md:p-8 shadow-2xl mx-3"
              style={{ boxShadow: "0 18px 70px rgba(15,23,42,0.14)", border: "1px solid rgba(255,255,255,0.5)" }}
            >
              <div className="grid md:grid-cols-2 gap-6 items-stretch">
                {/* Illustration */}
                <div className="hidden md:flex flex-col items-center justify-center p-6">
                  <div
                    className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden shadow-xl"
                    style={{ minHeight: 420, transform: `translateY(${parallax}px)` }}
                  >
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" />
                    <img
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60&auto=format&fit=crop"
                      alt="travel"
                      className="w-full h-full object-cover rounded-2xl"
                      style={{ filter: "saturate(1.03) contrast(0.98)" }}
                    />
                  </div>
                  <div className="mt-6 text-center text-gray-700">Personalized planning, powered by AI agents</div>
                </div>

                {/* Form Column */}
                <div className="p-2 md:p-6">
                  {/* Circular Step Markers */}
                  <div className="flex items-center justify-between mb-6">
                    {[
                      { key: 'route', icon: '✈', label: 'Route' },
                      { key: 'dates', icon: '📅', label: 'Dates' },
                      { key: 'people', icon: '👤', label: 'People' },
                      { key: 'budget', icon: '💰', label: 'Budget' },
                      { key: 'prefs', icon: '⭐', label: 'Interests' },
                    ].map((st, i) => {
                      const isActive = i <= step;
                      const circleClass = isActive
                        ? 'mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-gradient-to-br from-[#6BBFF1] to-[#2C74B3] text-white shadow-lg'
                        : 'mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-white/90 text-slate-600 border border-white/40';
                      const labelClass = isActive ? 'text-xs text-sky-700' : 'text-xs text-gray-400';
                      return (
                        <div key={st.key} className="flex-1 text-center">
                          <div className={circleClass} style={i === step ? { boxShadow: '0 8px 30px rgba(43,140,215,0.18)' } : {}}>
                            <span style={{ fontSize: 16 }}>{st.icon}</span>
                          </div>
                          <div className={labelClass}>{st.label}</div>
                        </div>
                      );
                    })}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#0F172A", fontFamily: "Poppins, sans-serif" }}>
                    {steps[step]}
                  </h2>

                {/* Source & Destination (Step 0 & 1) */}
                {step === 0 && (
                  <div className="space-y-4">
                    <label className="text-sm font-medium">From</label>
                    <div className="flex items-center gap-3">
                      <span className="p-3 rounded-xl bg-white/60 shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" stroke="#6BBFF1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <input
                        type="text"
                        value={data.source}
                        onChange={(e) => update({ source: e.target.value })}
                        placeholder="Your departure city or airport"
                        className="flex-1 px-4 py-3 rounded-2xl border border-white/60 bg-white/70 focus:outline-none hover:shadow-md transition"
                      />
                    </div>
                    <label className="text-sm font-medium">To</label>
                    <div className="flex items-center gap-3">
                      <span className="p-3 rounded-xl bg-white/60 shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6z" stroke="#6BBFF1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <input
                        type="text"
                        value={data.destination}
                        onChange={(e) => update({ destination: e.target.value })}
                        placeholder="Destination e.g., Bali"
                        className="flex-1 px-4 py-3 rounded-2xl border border-white/60 bg-white/70 focus:outline-none hover:shadow-md transition"
                      />
                    </div>
                  </div>
                )}

                {/* Dates */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">Choose your travel dates</div>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="date" value={data.startDate} onChange={(e) => update({ startDate: e.target.value })} className="px-4 py-3 rounded-xl border border-white/60 bg-white/70" />
                      <input type="date" value={data.endDate} onChange={(e) => update({ endDate: e.target.value })} className="px-4 py-3 rounded-xl border border-white/60 bg-white/70" />
                    </div>
                  </div>
                )}

                {/* Travelers */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-white shadow-md text-center">
                        <div className="text-sm text-gray-600 mb-2">Adults</div>
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => update({ adults: Math.max(1, data.adults - 1) })} className="w-9 h-9 rounded-full bg-white border border-gray-200">-</button>
                          <div className="font-semibold">{data.adults}</div>
                          <button onClick={() => update({ adults: data.adults + 1 })} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6BBFF1] to-[#2C74B3] text-white shadow-md">+</button>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white shadow-md text-center">
                        <div className="text-sm text-gray-600 mb-2">Children</div>
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => update({ children: Math.max(0, data.children - 1) })} className="w-9 h-9 rounded-full bg-white border border-gray-200">-</button>
                          <div className="font-semibold">{data.children}</div>
                          <button onClick={() => update({ children: data.children + 1 })} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6BBFF1] to-[#2C74B3] text-white shadow-md">+</button>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white shadow-md text-center">
                        <div className="text-sm text-gray-600 mb-2">Infants</div>
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => update({ infants: Math.max(0, data.infants - 1) })} className="w-9 h-9 rounded-full bg-white border border-gray-200">-</button>
                          <div className="font-semibold">{data.infants}</div>
                          <button onClick={() => update({ infants: data.infants + 1 })} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6BBFF1] to-[#2C74B3] text-white shadow-md">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Budget */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Budget per day</div>
                        <div className="text-xs text-gray-500">Move the slider to set your comfort level</div>
                      </div>
                      <div className="px-3 py-2 rounded-xl bg-white font-semibold shadow-sm">{'$' + budgetAmount + '/day'}</div>
                    </div>

                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={data.budgetPct}
                        onChange={(e) => update({ budgetPct: parseInt(e.target.value) })}
                        className="w-full h-3 appearance-none rounded-lg"
                        style={{
                          background: "linear-gradient(90deg,#FFD37E 0%, #FF8E72 50%, #6BBFF1 100%)",
                        }}
                      />

                      {/* floating bubble */}
                      <div
                        className="absolute -top-8 px-3 py-1 rounded-full text-sm font-semibold text-white shadow-md"
                        style={{ left: bubbleLeft, background: "linear-gradient(135deg,#FF8E72,#6BBFF1)" }}
                      >
                        {'$' + budgetAmount}
                      </div>
                    </div>
                  </div>
                )}

                {/* Note: Dates and Interests blocks are handled above for the new 6-step layout. */}

                {/* Interests (final step) */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">Pick interests (multi-select)</div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {ALL_INTERESTS.map((it) => {
                        const active = data.interests.includes(it.id);
                        const classes = active
                          ? 'px-4 py-2 rounded-full border-2 transition transform bg-[#2C74B3] text-white border-[#2C74B3]'
                          : 'px-4 py-2 rounded-full border-2 transition transform bg-white/80 border-white/60 hover:shadow-lg hover:scale-105';
                        const emoji = it.label === 'Beach' ? '🏖️' : it.label === 'Food' ? '🍜' : it.label === 'Nature' ? '🌲' : it.label === 'Museums' ? '🏛️' : it.label === 'Nightlife' ? '🎉' : it.label === 'Shopping' ? '🛍️' : '⭐';
                        return (
                          <button key={it.id} onClick={() => toggleInterest(it.id)} className={classes}>
                            <span className="mr-2 text-lg">{emoji}</span>
                            {it.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-4 mt-8">
                  {step > 0 && (
                    <button onClick={back} className="px-6 py-3 rounded-2xl border-2 border-white/60 font-semibold">Back</button>
                  )}
                  <button
                    onClick={next}
                    className="ml-auto px-6 py-3 rounded-2xl font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#6BBFF1,#2C74B3)", boxShadow: "0 6px 20px rgba(44,116,179,0.2)" }}
                  >
                    {step < steps.length - 1 ? "Next" : "Generate My Trip 🚀"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </div>
  );
}
