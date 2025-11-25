import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import Itinerary from "./components/ItineraryCard";
import Loading from "./pages/Loading";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing  />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/itinerary" element={<Itinerary />} />
      </Routes>
    </BrowserRouter>
  );
}
