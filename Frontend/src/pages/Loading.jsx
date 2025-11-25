import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Loading() {
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem("tripForm"));

      try {
        const res = await axios.post("http://localhost:5000/api/travel/generate", data);
        localStorage.setItem("aiItinerary", JSON.stringify(res.data));
        nav("/itinerary");
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-deep-navy)] via-[var(--color-ocean-blue)] to-[var(--color-deep-navy)] text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[rgba(var(--color-sky-blue-rgb),0.2)] rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Animated Globe Loader with Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mb-12"
        >
          {/* Outer Glow Ring */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-40 h-40 bg-[rgba(var(--color-sky-blue-rgb),0.2)] rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          />
          
          {/* Multiple Spinning Rings */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute w-40 h-40 border-4 border-[rgba(var(--color-sky-blue-rgb),0.4)] border-t-[var(--color-sky-blue)] rounded-full"
            />
            
            {/* Middle Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="absolute w-28 h-28 border-4 border-[rgba(var(--color-sunset-yellow-rgb),0.4)] border-t-[var(--color-sunset-yellow)] rounded-full"
            />
            
            {/* Inner Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute w-16 h-16 border-4 border-[rgba(var(--color-ocean-blue-rgb),0.4)] border-t-[var(--color-ocean-blue)] rounded-full"
            />
            
            {/* Center Icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-5xl"
            >
              ✈️
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center max-w-lg px-6"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--color-sky-blue)] via-[var(--color-ocean-blue)] to-[var(--color-sunset-yellow)] bg-clip-text text-transparent">
            Crafting Your Dream Journey
          </h2>
          
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            AI is generating your perfect travel itinerary...
          </motion.p>
          
          {/* Loading Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-3 h-3 bg-[var(--color-sky-blue)] rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Decorative Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 flex gap-8 text-sm text-gray-500"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            🗺️ Analyzing destinations
          </motion.span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          >
            🏨 Finding best hotels
          </motion.span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
          >
            💰 Calculating budget
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
