import React from "react";
import Navbar from "../components/layout/Navbar";

export default function PDFViewPage() {
  const handlePrint = () => {
    window.print();
  };

  // sample day content — in real app, pull from trip data
  const days = [
    {
      title: "Day 1 – Arrival & Relaxation",
      items: [
        { time: "Morning", text: "Arrive at Ngurah Rai Airport — transfer to resort" },
        { time: "Afternoon", text: "Check-in and unwind by the pool" },
        { time: "Evening", text: "Sunset dinner at Seminyak Beach" },
      ],
    },
    {
      title: "Day 2 – Culture & Temples",
      items: [
        { time: "Morning", text: "Visit Tanah Lot temple for sunrise" },
        { time: "Afternoon", text: "Explore rice terraces & artisan markets" },
        { time: "Evening", text: "Traditional Balinese dance in Ubud" },
      ],
    },
    {
      title: "Day 3 – Adventure",
      items: [
        { time: "Morning", text: "Tegallalang sunrise photo walk" },
        { time: "Afternoon", text: "Surfing lesson at Kuta Beach" },
        { time: "Evening", text: "Beach club relaxation" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 pb-16 px-6 flex justify-center">
        <div className="w-[794px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif', color: '#0F172A' }}>Your Trip Document</h1>
              <div className="text-sm text-gray-500">A4 Print Preview</div>
            </div>
            <div>
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #6BBFF1, #2C74B3)" }}
              >
                🖨️ Print / Download PDF
              </button>
            </div>
          </div>

          {/* A4 Page */}
          <article
            className="bg-white rounded-2xl p-10 shadow-2xl relative mx-auto overflow-hidden"
            style={{
              minHeight: '1122px',
              width: '794px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.12)'
            }}
          >
            {/* Watermark */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ fontSize: '7.5rem', color: '#2C74B3', transform: 'rotate(-45deg)', opacity: 0.04 }}
            >
              Travellio
            </div>

            {/* Optional Hero strip */}
            <div className="w-full h-36 rounded-xl overflow-hidden mb-6">
              <div className="w-full h-full object-cover" style={{ background: 'linear-gradient(90deg, #6BBFF1, #2C74B3)' }} />
            </div>

            {/* Header */}
            <header className="text-center mb-6">
              <h1 className="text-4xl font-extrabold mb-1" style={{ fontFamily: 'Poppins, sans-serif', color: '#0F172A' }}>Bali Adventure</h1>
              <p className="text-gray-600">May 15 – May 20, 2025</p>
              <p className="text-sm text-gray-500 mt-1">Prepared by Travellio AI</p>
            </header>

            {/* Content area: day-by-day */}
            <section className="space-y-6 mt-4">
              {days.map((d, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.06)', background: '#ffffff' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-2.5 h-full bg-[#6BBFF1] rounded-md mt-1" />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-lg font-semibold" style={{ color: '#0F172A' }}>{d.title}</h3>
                      </div>

                      <ul className="mt-3 space-y-2 text-sm text-gray-700">
                        {d.items.map((it, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="mt-1 text-sky-500">•</div>
                            <div>
                              <div className="text-xs text-gray-500 uppercase">{it.time}</div>
                              <div className="text-sm text-gray-800">{it.text}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Footer */}
            <footer className="mt-10 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
              <p>Generated with ❤️ by Travellio — Your AI Travel Companion</p>
              <p className="mt-1">support@travellio.com • travellio.com</p>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
