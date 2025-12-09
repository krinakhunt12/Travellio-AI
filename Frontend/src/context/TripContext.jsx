import React, { createContext, useState, useContext, useEffect } from "react";

const TripContext = createContext();

export const useTripContext = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    adults: 2,
    children: 0,
    budget: "moderate",
    selectedInterests: [],
    itinerary: [],
    hotels: [],
    costBreakdown: null,
    // raw master plan if available
    masterPlan: null,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('aiItinerary');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      // if backend wraps with { success, data, metadata }
      const plan = parsed?.data || parsed;

      const mapped = {
        masterPlan: plan,
        destination: (plan?.metadata?.destination) || (plan?.trip_summary ? (plan.trip_summary.match(/for\s(.*?)\./)?.[1] || '') : ''),
        itinerary: plan?.daywise_itinerary || [],
        hotels: plan?.hotels || { budget: [], mid: [], luxury: [] },
        costBreakdown: plan?.final_budget_breakdown || plan?.finalBudgetBreakdown || null,
        weather: plan?.weather_overview || plan?.best_time_to_visit || '',
        packing_list: plan?.packing_list || plan?.packingList || '',
        safety_tips: plan?.safety_tips || plan?.safetyTips || '',
        attractions: plan?.attractions || [],
        estimatedCost: plan?.final_budget_breakdown?.grand_total || plan?.finalBudgetBreakdown?.grand_total || null,
      };

      setTripData((d) => ({ ...d, ...mapped }));
    } catch (err) {
      // ignore parse errors
    }
  }, []);

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};
