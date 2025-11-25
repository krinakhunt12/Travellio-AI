import React from "react";

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
    <div className="relative rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-2xl">
      <img src={d.img} alt={d.name} className="w-full h-48 object-cover" />
      <div className="p-4 bg-white/10 backdrop-blur-md text-white absolute bottom-0 left-0 right-0 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{d.name}</div>
          <div className="text-sm opacity-80">{d.distance}</div>
        </div>
        <div className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{d.bestMonth}</div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-900 antialiased">
      <header className="relative">
        {/* Hero background */}
        <div className="relative h-screen w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0b3b61] to-[#0b5f8a]"
            style={{ filter: "blur(0.6px)" }}
          />

          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop"
            alt="ocean"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />

          {/* Animated airplane path (SVG) */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path id="flightPath" d="M10 80 C 200 10, 400 120, 800 60" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeDasharray="6 6" />
            <circle r="6" fill="#fff" className="plane" />
            <style>{`\n              .plane{ transform: translate(10px,80px); animation: fly 6s linear infinite; }\n              @keyframes fly{ 0%{ offset-distance:0%; } 100%{ offset-distance:100%; } }\n            `}</style>
          </svg>

          {/* Center glass search card */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-4xl w-full">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-6 md:p-10 text-white" style={{ boxShadow: '0 8px 30px rgba(2,6,23,0.6)' }}>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Plan your perfect getaway
                </h1>
                <p className="text-lg opacity-90 mb-6">Smart itineraries and curated experiences powered by AI</p>

                <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="text-xs uppercase opacity-80">Destination</label>
                    <input className="mt-1 w-full rounded-xl p-3 bg-white/10 placeholder-white/60 text-white outline-none" placeholder="Where are you going?" />
                  </div>
                  <div>
                    <label className="text-xs uppercase opacity-80">Dates</label>
                    <input className="mt-1 w-full rounded-xl p-3 bg-white/10 placeholder-white/60 text-white outline-none" placeholder="Flexible dates" />
                  </div>
                  <div>
                    <button type="button" className="w-full rounded-xl p-3 bg-white text-blue-800 font-semibold shadow-md">Search</button>
                  </div>
                </form>
                <div className="mt-4 text-sm opacity-80">Or try: <span className="underline">Bali, Santorini, Maldives</span></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="-mt-28 relative z-10 px-6 md:px-12 pb-20">
        <section className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.slice(0,6).map((d) => (
              <DestinationCard key={d.name} d={d} />
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Why use our AI?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Personalized itineraries', icon: '🧭' },
              { title: 'Real-time optimization', icon: '⚡' },
              { title: 'Local tips & safety', icon: '📌' },
              { title: 'Seamless bookings', icon: '💳' },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm mt-2 opacity-80">{`Smart ${c.title.toLowerCase()}`}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">What travelers say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sofia L.', text: 'The itinerary was perfect — saved us so much time and uncovered hidden gems.' },
              { name: 'Mark R.', text: 'Beautiful recommendations and smooth booking flow. Highly recommended.' },
              { name: 'Aisha K.', text: 'Lovely designs and spot-on suggestions for food and activities.' },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-sm opacity-70 mb-3">"{t.text}"</div>
                <div className="font-semibold">{t.name}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10">
        {/* Wave footer */}
        <div className="relative bg-gradient-to-t from-[#062a46] to-transparent text-white pt-10">
          <svg viewBox="0 0 1440 200" className="w-full -mt-1">
            <path d="M0,64 C200,160 400,0 720,64 C1100,140 1200,80 1440,64 L1440 320 L0 320 Z" fill="#062a46" />
          </svg>
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="text-xl font-bold">Travellio</div>
              <div className="text-sm opacity-80">Plan smarter trips with AI-curated itineraries</div>
            </div>
            <div className="mt-6 md:mt-0 text-sm opacity-80">© {new Date().getFullYear()} Travellio — All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
