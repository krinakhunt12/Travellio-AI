import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const breakdown = [
  { category: "Flights", amount: 450, percent: 36 },
  { category: "Hotels", amount: 475, percent: 38 },
  { category: "Food", amount: 200, percent: 16 },
  { category: "Activities", amount: 125, percent: 10 },
];

const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

export default function CostBreakdownPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #D9EEF9 100%)" }}>
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* subtle cloud */}
          <svg className="absolute left-0 right-0 mx-auto -top-6 w-full opacity-20 pointer-events-none" viewBox="0 0 1440 140" preserveAspectRatio="none">
            <path d="M0 60 C200 10 400 10 600 60 C800 110 1000 110 1200 60 C1300 30 1400 30 1440 50 L1440 0 L0 0 Z" fill="#ffffff" />
          </svg>

          <h1 className={`text-4xl md:text-5xl font-extrabold mb-2 text-center ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} style={{ fontFamily: "Poppins, sans-serif", transition: 'all 360ms ease' }}>
            Cost Breakdown
          </h1>
          <p className={`text-center text-gray-600 mb-12 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`} style={{ transition: 'all 420ms ease' }}>Your estimated trip expenses</p>

          {/* Total + Per Person Row */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transition: 'all 420ms ease' }}>
            <div className="md:col-span-2 bg-white rounded-3xl p-8 text-center" style={{ boxShadow: "0 8px 30px rgba(15, 23, 42, 0.1)" }}>
              <div className="text-sm text-gray-500 uppercase mb-2">Total Estimated Cost</div>
              <div className="text-5xl md:text-6xl font-extrabold" style={{ color: "#2C74B3", letterSpacing: '-0.02em' }}>
                ${total}
              </div>
              <div className="text-sm text-gray-600 mt-2">For 2 adults, 5 days</div>
            </div>

            <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center" style={{ boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)" }}>
              <div className="text-sm text-gray-500 mb-1 uppercase">Cost per person</div>
              <div className="text-3xl md:text-4xl font-extrabold" style={{ color: "#2C74B3" }}>${(total / 2).toFixed(0)}</div>
              <div className="text-xs text-gray-400 mt-2">Estimated for the selected travelers</div>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className={`bg-white rounded-3xl p-8 mb-8 shadow-lg ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)", transition: 'all 420ms ease' }}>
            <h3 className="text-xl font-semibold mb-6">Breakdown by Category</h3>
            <div className="space-y-6">
              {breakdown.map((item, idx) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700 font-medium">{item.category}</div>
                    <div className="text-sm font-bold" style={{ color: '#2C74B3' }}>${item.amount}</div>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden" style={{ background: '#F1F3F6' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: mounted ? `${item.percent}%` : '0%',
                        transition: `width 700ms cubic-bezier(.2,.9,.2,1) ${idx * 80}ms`,
                        background: 'linear-gradient(135deg,#6BBFF1,#2C74B3)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className={`text-center ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transition: 'all 420ms ease' }}>
            <button
              onClick={() => navigate("/pdf")}
              className="px-10 py-4 rounded-2xl font-semibold text-white text-lg transition-transform transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #6BBFF1, #2C74B3)",
                boxShadow: "0 8px 20px rgba(44, 116, 179, 0.3)",
              }}
            >
              Download PDF Itinerary →
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
