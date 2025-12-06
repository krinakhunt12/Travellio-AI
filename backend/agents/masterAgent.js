// agents/masterAgent.js
// 🔵 MASTER ORCHESTRATOR AGENT - Coordinates all specialized agents

const cityAnalysisAgent = require("./city-analysis/cityAnalysisAgent.js");
const { AttractionFinderAgent } = require("./attractions/attractionAgent.js");
const { hotelAgent } = require("./hotel-finder/hotelAgent.js");
const { generateItinerary } = require("../services/itinerary.service");
const { BudgetCalculatorAgent } = require("./budget-calculator/budgetAgent.js");
const { geocodeLocation } = require("../services/geocodingService");

/**
 * MASTER ORCHESTRATOR
 * Coordinates 5 specialized agents:
 * 1. City Analysis Agent - Weather, safety, culture, tips
 * 2. Attraction Finder Agent - Top attractions with details
 * 3. Hotel Finder Agent - Budget/Mid/Luxury hotels
 * 4. Itinerary Planner Agent - Optimized day-wise schedule
 * 5. Budget Calculator Agent - Complete cost breakdown
 */
async function masterTravelAgent(req, res) {
  try {
    const {
      departureCity,
      destination,
      travelDates,
      travellers = 2,
      budget,
      interests = [],
      comfort = "mid",
    } = req.body;

    console.log("🎯 MASTER AGENT: Starting orchestration for", destination);

    // ========================================
    // STEP 0: GEOCODE DESTINATION
    // ========================================
    console.log("📍 Step 0/5: Getting location coordinates...");
    let locationData = {};
    try {
      locationData = await geocodeLocation(destination);
      console.log(`✅ Location found: ${locationData.displayName}`);
    } catch (err) {
      console.warn("⚠️ Geocoding failed:", err.message);
      // Continue with null coordinates - city analysis will handle fallback
    }

    // ========================================
    // STEP 1: CITY ANALYSIS AGENT
    // ========================================
    console.log("📊 Step 1/5: Calling City Analysis Agent...");
    let cityAnalysis = {};
    try {
      // Create mock req/res for cityAnalysisAgent
      const mockReq = {
        body: {
          city: locationData.city || destination,
          lat: locationData.lat,
          lon: locationData.lon,
          country: locationData.country || destination,
        },
      };
      const mockRes = {
        json: (data) => {
          cityAnalysis = data;
        },
        status: () => mockRes,
      };
      await cityAnalysisAgent(mockReq, mockRes);
    } catch (err) {
      console.warn("⚠️ City Analysis failed, using fallback:", err.message);
      cityAnalysis = {
        bestTimeToVisit: "October to March",
        weatherByMonth: "Pleasant weather most of the year",
        safetySummary: "Generally safe for tourists",
        localLaws: "Respect local customs",
        scams: "Be cautious of tourist scams",
        etiquette: "Dress modestly at religious sites",
        plugType: "Type C/D",
        simCard: "Available at airport",
        transport: "Taxis and public transport available",
        visa: "Check visa requirements",
      };
    }

    // ========================================
    // STEP 2: ATTRACTION FINDER AGENT
    // ========================================
    console.log("🎨 Step 2/5: Calling Attraction Finder Agent...");
    let attractionsData = { attractions: [] };
    try {
      attractionsData = await AttractionFinderAgent(destination);
    } catch (err) {
      console.warn("⚠️ Attractions fetch failed:", err.message);
    }

    const attractions = attractionsData.attractions || [];
    console.log(`✅ Found ${attractions.length} attractions`);

    // ========================================
    // STEP 3: HOTEL FINDER AGENT
    // ========================================
    console.log("🏨 Step 3/5: Calling Hotel Finder Agent...");
    let hotelData = { grouped: { budget: [], mid: [], luxury: [] } };
    try {
      hotelData = await hotelAgent(destination);
    } catch (err) {
      console.warn("⚠️ Hotel fetch failed:", err.message);
    }

    // ========================================
    // STEP 4: ITINERARY PLANNER AGENT
    // ========================================
    console.log("📅 Step 4/5: Calling Itinerary Planner Agent...");
    let itinerary = [];
    try {
      // Use top 3 attractions for single-day itinerary
      const topAttractions = attractions.slice(0, 3).map((a) => ({
        name: a.name,
        lat: a.lat,
        lon: a.lon,
        category: a.category,
        description: a.description,
      }));

      if (topAttractions.length >= 3) {
        const itineraryResult = await generateItinerary(topAttractions);
        itinerary = [itineraryResult];
      }
    } catch (err) {
      console.warn("⚠️ Itinerary generation failed:", err.message);
    }

    // ========================================
    // STEP 5: BUDGET CALCULATOR AGENT
    // ========================================
    console.log("💰 Step 5/5: Calling Budget Calculator Agent...");
    
    // Parse travel dates to calculate nights
    const dateMatch = travelDates?.match(/(\d+)/g);
    const days = dateMatch ? parseInt(dateMatch[0]) || 3 : 3;
    const nights = days - 1;

    // Select hotel based on comfort level
    const selectedHotels = hotelData.grouped[comfort] || hotelData.grouped.mid || [];
    const avgHotelPrice = selectedHotels.length > 0
      ? selectedHotels.reduce((sum, h) => sum + (h.pricePerNightINR || 3000), 0) / selectedHotels.length
      : 3000;

    let budgetBreakdown = {};
    try {
      budgetBreakdown = await BudgetCalculatorAgent({
        from: departureCity || "Mumbai",
        to: destination,
        departDate: travelDates?.split("-")[0] || new Date().toISOString().split("T")[0],
        days,
        hotelPrice: Math.round(avgHotelPrice),
        nights,
        rooms: Math.ceil(travellers / 2),
        attractions: attractions.slice(0, 10),
        distanceKm: 50, // Estimated local travel
      });
    } catch (err) {
      console.warn("⚠️ Budget calculation failed:", err.message);
      budgetBreakdown = {
        flight: 18000,
        hotel_total: avgHotelPrice * nights,
        food_total: days * 800,
        local_transport: 2000,
        activities: 3000,
        pocket_money: 5000,
        total_trip_cost: 50000,
        per_person: 25000,
      };
    }

    // ========================================
    // STEP 6: MASTER INTEGRATION & OUTPUT
    // ========================================
    console.log("✨ Step 6/6: Integrating all outputs...");

    const finalPlan = {
      trip_summary: `Complete ${days}-day travel plan for ${destination}. Designed for ${travellers} travelers with ${comfort} comfort preference.`,
      
      best_time_to_visit: cityAnalysis.bestTimeToVisit || "Check seasonal weather",
      
      weather_overview: cityAnalysis.weatherByMonth || "Pleasant climate year-round",
      
      city_safety_and_tips: cityAnalysis.safetySummary || "Exercise normal precautions",
      
      local_culture_and_practical_info: {
        laws: cityAnalysis.localLaws || "Respect local regulations",
        etiquette: cityAnalysis.etiquette || "Be respectful of local customs",
        sim_card: cityAnalysis.simCard || "SIM cards available at airport and stores",
        transport_system: cityAnalysis.transport || "Public transport and taxis available",
        plugs: cityAnalysis.plugType || "Check plug type for your destination",
      },
      
      attractions: attractions.map((a) => ({
        name: a.name,
        category: a.category || "attraction",
        short_description: a.description || a.why_famous || "Popular tourist destination",
        ticket_price: a.ticket_price || "Free/Varies",
        timings: a.timings || "Check local timings",
        best_time: a.best_time_to_visit || "Morning or evening",
        duration: a.visit_duration || "1-2 hours",
        coords: { lat: a.lat, lng: a.lon },
        image_url: a.image || null,
      })),
      
      daywise_itinerary: itinerary.map((day, idx) => ({
        day: idx + 1,
        morning: day.morning || { place: "TBD", desc: "", duration: "", ticket: "", category: "" },
        afternoon: day.afternoon || { place: "TBD", desc: "", duration: "", ticket: "", category: "" },
        evening: day.evening || { place: "TBD", desc: "", duration: "", ticket: "", category: "" },
      })),
      
      hotels: {
        budget: (hotelData.grouped.budget || []).map((h) => ({
          name: h.name,
          price: h.pricePerNightINR || h.price || "3000",
          area: h.area || h.address || "Central area",
          why_area_is_good: h.whyThisAreaIsGood || "Convenient location",
          best_for: h.bestFor?.join(", ") || "All travelers",
          distance_to_center: h.distanceToMainAttractions || "TBD",
        })),
        mid: (hotelData.grouped.mid || hotelData.grouped.midRange || []).map((h) => ({
          name: h.name,
          price: h.pricePerNightINR || h.price || "5000",
          area: h.area || h.address || "Central area",
          why_area_is_good: h.whyThisAreaIsGood || "Good connectivity",
          best_for: h.bestFor?.join(", ") || "All travelers",
          distance_to_center: h.distanceToMainAttractions || "TBD",
        })),
        luxury: (hotelData.grouped.luxury || []).map((h) => ({
          name: h.name,
          price: h.pricePerNightINR || h.price || "12000",
          area: h.area || h.address || "Premium location",
          why_area_is_good: h.whyThisAreaIsGood || "Upscale neighborhood",
          best_for: h.bestFor?.join(", ") || "Luxury seekers",
          distance_to_center: h.distanceToMainAttractions || "TBD",
        })),
      },
      
      transport_costs: {
        flight_estimate: `₹${budgetBreakdown.flight || 18000}`,
        train_estimate: "Check railway booking sites",
        local_transport: `₹${budgetBreakdown.local_transport || 2000}`,
      },
      
      food_cost: {
        per_day: "₹800 - ₹1500",
        total: `₹${budgetBreakdown.food_total || days * 800}`,
      },
      
      pocket_money: `₹${budgetBreakdown.pocket_money || 5000}`,
      
      final_budget_breakdown: {
        hotel_total: `₹${budgetBreakdown.hotel_total || avgHotelPrice * nights}`,
        flight_total: `₹${budgetBreakdown.flight || 18000}`,
        food_total: `₹${budgetBreakdown.food_total || days * 800}`,
        transport_total: `₹${budgetBreakdown.local_transport || 2000}`,
        activities_total: `₹${budgetBreakdown.activities || 3000}`,
        grand_total: `₹${budgetBreakdown.total_trip_cost || 50000}`,
        per_person: `₹${budgetBreakdown.per_person || 25000}`,
      },
      
      packing_list: "Light clothes, sunscreen, comfortable shoes, medications, power adapter, travel documents",
      
      safety_tips: cityAnalysis.scams || "Keep valuables secure, avoid isolated areas at night, use registered taxis",
    };

    console.log("✅ MASTER AGENT: Orchestration complete!");
    
    res.json({
      success: true,
      data: finalPlan,
      metadata: {
        orchestrated_at: new Date().toISOString(),
        agents_called: 5,
        destination,
        travellers,
        days,
      },
    });
    
  } catch (error) {
    console.error("❌ MASTER AGENT ERROR:", error);
    res.status(500).json({
      success: false,
      error: "Master orchestration failed",
      details: error.message,
    });
  }
}

module.exports = { masterTravelAgent };
