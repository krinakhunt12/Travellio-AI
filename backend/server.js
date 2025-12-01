import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import travelRouter from "./routes/travelAgent.js";
import cityAnalysisAgent from "./agents/cityAnalysisAgent.js";
import attractionsRoute from "./routes/attractionsRoute.js";
import hotelsRouter from "./routes/hotels.js";

dotenv.config();

// Debug: Check if API key is loaded
console.log('GEMINI_API_KEY loaded:', process.env.GEMINI_API_KEY ? 'Yes (length: ' + process.env.GEMINI_API_KEY.length + ')' : 'No - NOT FOUND!');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/travel", travelRouter);
app.post("/city-analysis", cityAnalysisAgent);
app.use("/api/attractions", attractionsRoute);
app.use('/api/hotels', hotelsRouter);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
