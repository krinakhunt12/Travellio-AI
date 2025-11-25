import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Preferences() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    departureCity: "",
    destination: "",
    travelDates: "",
    travellers: 1,
    budget: "",
    interests: [],
    comfort: "mid",
  });

  const toggleInterest = (value) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }));
  };

  const submit = () => {
    localStorage.setItem("tripForm", JSON.stringify(form));
    nav("/loading");
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-12 px-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-8">
          Travel Preferences
        </h2>

        <div className="space-y-6">
          {/* Input */}
          <div>
            <label className="text-lg font-semibold">Departure City</label>
            <input
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="Enter departure city"
              onChange={(e) =>
                setForm({ ...form, departureCity: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-lg font-semibold">Destination</label>
            <input
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="Enter your destination"
              onChange={(e) =>
                setForm({ ...form, destination: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-lg font-semibold">Travel Dates</label>
            <input
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-sky-500 outline-none"
              type="text"
              placeholder="e.g., 10 Jan - 15 Jan"
              onChange={(e) =>
                setForm({ ...form, travelDates: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-lg font-semibold">Travellers</label>
            <input
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-sky-500 outline-none"
              type="number"
              placeholder="Number of travellers"
              onChange={(e) =>
                setForm({ ...form, travellers: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-lg font-semibold">Budget (₹)</label>
            <input
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="e.g., 15000"
              onChange={(e) =>
                setForm({ ...form, budget: e.target.value })
              }
            />
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <p className="text-lg font-semibold">Interests</p>

            <div className="flex flex-wrap gap-3">
              {["Nature", "Museums", "Shopping", "Food", "Nightlife"].map(
                (i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleInterest(i)}
                    className={`px-4 py-2 rounded-xl border backdrop-blur-lg transition-all ${
                      form.interests.includes(i)
                        ? "bg-sky-500 border-sky-400 text-white shadow-lg"
                        : "bg-white/10 border-white/20"
                    }`}
                  >
                    {i}
                  </motion.button>
                )
              )}
            </div>
          </div>

          {/* Comfort Slider */}
          <div>
            <p className="text-lg font-semibold">Comfort Level</p>

            <div className="flex gap-4 mt-3">
              {["low", "mid", "high"].map((level) => (
                <motion.button
                  key={level}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setForm({ ...form, comfort: level })}
                  className={`px-4 py-2 rounded-xl border transition-all capitalize ${
                    form.comfort === level
                      ? "bg-purple-500 border-purple-400 text-white shadow-md"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={submit}
            className="w-full mt-6 py-4 text-lg font-bold bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-xl hover:opacity-90"
          >
            Generate Itinerary
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
