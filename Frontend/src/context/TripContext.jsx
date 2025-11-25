import React, { createContext, useState, useContext } from "react";

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
  });

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};
