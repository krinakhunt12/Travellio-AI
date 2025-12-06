const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const travelRouter = require("./routes/travelAgent.js");
const cityAnalysisAgent = require("./agents/city-analysis/cityAnalysisAgent.js");
const attractionsRoute = require("./routes/attractionsRoute.js");
const hotelRoutes = require("./routes/hotelRoutes.js");
const morgan = require('morgan');
const itineraryRoutes = require("./routes/itinerary.routes");
const budgetRoutes = require("./routes/budgetRoutes.js");
dotenv.config();

// Debug: Check if API key is loaded
console.log('GEMINI_API_KEY loaded:', process.env.GEMINI_API_KEY ? 'Yes (length: ' + process.env.GEMINI_API_KEY.length + ')' : 'No - NOT FOUND!');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/travel", travelRouter);
app.post("/city-analysis", cityAnalysisAgent);
app.use("/api/attractions", attractionsRoute);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/budget", budgetRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
