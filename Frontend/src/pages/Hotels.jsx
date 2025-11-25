import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const hotels = [
  {
    id: 1,
    name: "Seminyak Beach Resort",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    rating: 4.8,
    price: 150,
    amenities: ["🏊 Pool", "🍳 Breakfast", "📶 WiFi", "🅿️ Parking"],
    category: "luxury",
  },
  {
    id: 2,
    name: "Ubud Jungle Villa",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    rating: 4.6,
    price: 95,
    amenities: ["🌿 Garden", "🍳 Breakfast", "📶 WiFi"],
    category: "moderate",
  },
  {
    id: 3,
    name: "Kuta Budget Inn",
    img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    rating: 4.2,
    price: 45,
    amenities: ["📶 WiFi", "❄️ AC"],
    category: "budget",
  },
];

export default function HotelsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? hotels : hotels.filter((h) => h.category === filter);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#FFFFFF 0%, #D9EEF9 100%)" }}>
      <Navbar />

      {/* top cloud texture */}
      <div className="relative">
        <svg className="absolute -top-12 left-0 w-full opacity-25 pointer-events-none" viewBox="0 0 1440 140" preserveAspectRatio="none">
          <path d="M0 60 C200 10 400 10 600 60 C800 110 1000 110 1200 60 C1300 30 1400 30 1440 50 L1440 0 L0 0 Z" fill="#ffffff" />
        </svg>

        <div className="pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2" style={{ fontFamily: "Poppins, sans-serif", color: '#0F172A' }}>
              Hotel Suggestions
            </h1>
            <p className="text-gray-600 mb-8">Handpicked stays for your trip</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <aside className="md:col-span-1">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sticky top-24"
                  style={{ boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)' }}>
                  <h3 className="font-semibold text-lg mb-4">Filters</h3>
                  <div className="space-y-3">
                    {["all", "luxury", "moderate", "budget"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`w-full text-left px-4 py-2 rounded-xl transition-flex ${filter === cat ? 'bg-sky-100 text-sky-700 shadow-inner' : 'bg-white/60 hover:shadow-md'}`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <div className="capitalize font-medium">{cat}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Hotel Cards Grid */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((hotel) => (
                  <article key={hotel.id} className="bg-white rounded-3xl overflow-hidden transform transition duration-300 hover:-translate-y-2 shadow-md" style={{ boxShadow: '0 8px 30px rgba(2,6,23,0.06)' }}>
                    <div className="h-44 md:h-40 w-full overflow-hidden rounded-t-3xl">
                      <img src={hotel.img} alt={hotel.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif', color: '#0F172A' }}>{hotel.name}</h3>
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-medium">{hotel.rating}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-extrabold" style={{ color: '#2C74B3' }}>${hotel.price}</div>
                          <div className="text-xs text-gray-500">per night</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4 mb-4">
                        {hotel.amenities.map((a, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-xs shadow-sm">{a}</span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center gap-3">
                        <button className="px-4 py-2 rounded-xl font-semibold text-white transition transform hover:scale-105"
                          style={{ background: 'linear-gradient(135deg,#6BBFF1,#2C74B3)', boxShadow: '0 8px 20px rgba(44,116,179,0.12)' }}>
                          Book Now
                        </button>
                        <button className="text-sm text-gray-500 underline" onClick={() => navigate(`/hotels/${hotel.id}`)}>View details</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/cost-breakdown")}
                className="px-10 py-4 rounded-2xl font-semibold text-white text-lg transition-transform transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6BBFF1, #2C74B3)",
                  boxShadow: "0 8px 20px rgba(44, 116, 179, 0.3)",
                }}
              >
                View Cost Breakdown →
              </button>
            </div>
          </div>
        </div>

        {/* subtle wave divider */}
        <div className="mt-12">
          <svg viewBox="0 0 1440 80" className="w-full h-20" preserveAspectRatio="none">
            <path d="M0,32 C360,96 720,0 1080,32 C1260,56 1440,16 1440,16 L1440 80 L0 80 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      <Footer />
    </div>
  );
}
