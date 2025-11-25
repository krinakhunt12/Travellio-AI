import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20">
      {/* Wave divider */}
      <svg viewBox="0 0 1440 200" className="w-full -mb-1">
        <path
          d="M0,64 C200,160 400,0 720,64 C1100,140 1200,80 1440,64 L1440 320 L0 320 Z"
          fill="#0F172A"
        />
      </svg>

      <div
        className="text-white py-12"
        style={{ background: "#0F172A" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="text-2xl font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                Travellio ✈️
              </div>
              <p className="text-sm text-white/70">
                Plan smarter trips with AI-curated itineraries and personalized recommendations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div className="font-semibold mb-3">Quick Links</div>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/" className="hover:text-sky-400">Home</Link></li>
                <li><Link to="/preferences" className="hover:text-sky-400">Plan Trip</Link></li>
                <li><Link to="/about" className="hover:text-sky-400">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-sky-400">Contact</Link></li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <div className="font-semibold mb-3">Popular Destinations</div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Bali, Indonesia</li>
                <li>Santorini, Greece</li>
                <li>Maldives</li>
                <li>Amalfi Coast, Italy</li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <div className="font-semibold mb-3">Follow Us</div>
              <div className="flex gap-4">
                <a href="#" className="text-2xl hover:text-sky-400">📘</a>
                <a href="#" className="text-2xl hover:text-sky-400">📸</a>
                <a href="#" className="text-2xl hover:text-sky-400">🐦</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 text-center text-sm text-white/70">
            © {new Date().getFullYear()} Travellio — All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
