import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  CloudIcon,
  BanknotesIcon,
  MapIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function Itinerary() {
  const data = JSON.parse(localStorage.getItem("aiItinerary"));

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#0F172A]">
        <p className="text-xl">No itinerary found. Please generate a new one.</p>
      </div>
    );
  }

  // Card Animation
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6 },
  });

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* HEADER */}
        <motion.h1
          {...fadeUp(0)}
          className="text-5xl font-extrabold text-center"
        >
          Your Trip Plan ✈️
        </motion.h1>

        {/* TRIP SUMMARY */}
        <motion.section
          {...fadeUp(0.1)}
          className="glass-card p-6 rounded-3xl"
        >
          <h2 className="section-title">Trip Summary</h2>
          <p className="text-gray-200 leading-relaxed">{data.trip_summary}</p>
        </motion.section>

        {/* BEST TIME */}
        <motion.section {...fadeUp(0.15)} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title flex items-center gap-2">
            <CalendarDaysIcon className="w-7 h-7 text-yellow-300" />
            Best Time to Visit
          </h2>
          <p className="text-gray-200">{data.best_time}</p>
        </motion.section>

        {/* WEATHER */}
        <motion.section {...fadeUp(0.2)} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title flex items-center gap-2">
            <CloudIcon className="w-7 h-7 text-blue-300" />
            Weather
          </h2>
          <p className="text-gray-200">{data.weather}</p>
        </motion.section>

        {/* DAY-WISE ITINERARY */}
        <motion.section {...fadeUp(0.25)}>
          <h2 className="section-title">Day-wise Itinerary</h2>

          <div className="space-y-6">
            {data.daywise_itinerary.map((day, index) => (
              <motion.div
                key={day.day}
                {...fadeUp(0.15 * index)}
                className="glass-card p-6 rounded-3xl"
              >
                <h3 className="text-2xl font-bold mb-3">Day {day.day} – {day.title}</h3>

                <div className="space-y-4">
                  {["morning", "afternoon", "evening"].map((time) => (
                    <div
                      key={time}
                      className="bg-white/5 p-4 rounded-xl border border-white/10"
                    >
                      <p className="text-lg font-semibold capitalize text-sky-300">
                        {time}
                      </p>
                      <p className="text-gray-200 font-bold">{day[time].place}</p>
                      <p className="text-gray-300 text-sm mt-1">{day[time].desc}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        🎫 Ticket: {day[time].ticket} | ⏱ {day[time].duration}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* HOTEL RECOMMENDATIONS */}
        <motion.section {...fadeUp(0.3)} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title flex items-center gap-2">
            <BuildingOffice2Icon className="w-7 h-7 text-green-300" />
            Hotel Recommendations
          </h2>

          {["budget", "mid", "luxury"].map((type) => (
            <div key={type} className="mb-6">
              <p className="text-xl font-semibold capitalize text-sky-300 mb-2">
                {type} stays
              </p>

              <div className="space-y-2">
                {data.hotels[type].map((hotel, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 p-3 rounded-xl border border-white/10"
                  >
                    <p className="font-bold">{hotel.name}</p>
                    <p className="text-gray-300 text-sm">{hotel.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.section>

        {/* TRANSPORT COST */}
        <motion.section {...fadeUp(0.35)} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title flex items-center gap-2">
            <MapIcon className="w-7 h-7 text-purple-300" />
            Transport Cost
          </h2>
          <p className="text-gray-200 mb-2">✈️ {data.transport.flight_cost}</p>
          <p className="text-gray-200">🚕 {data.transport.local_transport}</p>
        </motion.section>

        {/* FOOD COST */}
        <motion.section {...fadeUp(0.4)} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title">Food Cost</h2>
          <p className="text-gray-200">{data.food_cost}</p>
        </motion.section>

        {/* POCKET MONEY */}
        <motion.section {...fadeUp(0.45)} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title">Pocket Money</h2>
          <p className="text-gray-200">{data.pocket_money}</p>
        </motion.section>

        {/* TOTAL BUDGET BREAKDOWN */}
        <motion.section {...fadeUp(0.5)} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title flex items-center gap-2">
            <BanknotesIcon className="w-7 h-7 text-yellow-400" />
            Total Budget Breakdown
          </h2>

          <div className="mt-4 space-y-3">
            {data.total_estimate.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between bg-white/5 p-3 rounded-xl border border-white/10"
              >
                <p className="font-semibold">{item.item}</p>
                <p className="text-green-300 font-bold">{item.cost}</p>
              </div>
            ))}
          </div>

          <p className="text-2xl font-bold text-center mt-5 text-yellow-300">
            Total: {data.total_estimate.total}
          </p>
        </motion.section>

        {/* SAFETY TIPS */}
        <motion.section {...fadeUp(0.55)} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title flex items-center gap-2">
            <ShieldCheckIcon className="w-7 h-7 text-red-300" />
            Safety Tips
          </h2>
          <pre className="text-gray-200 whitespace-pre-wrap">{data.tips}</pre>
        </motion.section>

        {/* PACKING LIST */}
        <motion.section {...fadeUp(0.6)} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title flex items-center gap-2">
            <BriefcaseIcon className="w-7 h-7 text-orange-300" />
            Packing List
          </h2>
          <pre className="text-gray-200 whitespace-pre-wrap">{data.packing_list}</pre>
        </motion.section>

      </div>
    </div>
  );
}

/* Utility Class (Paste this in your global CSS or Tailwind config)
--------------------------------------------------------------- */
