import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TripProvider } from "./context/TripContext";
import Home from "./pages/Home";
import PreferencesPage from "./pages/Preferences";
import TripSummaryPage from "./pages/TripSummary";
import ItineraryPage from "./pages/Itinerary";
import HotelsPage from "./pages/Hotels";
import CostBreakdownPage from "./pages/CostBreakdown";
import PDFViewPage from "./pages/PDFView";
import About from "./pages/About";
import "./styles/colors.css";

export default function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/trip-summary" element={<TripSummaryPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/cost-breakdown" element={<CostBreakdownPage />} />
          <Route path="/pdf" element={<PDFViewPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </TripProvider>
  );
}
