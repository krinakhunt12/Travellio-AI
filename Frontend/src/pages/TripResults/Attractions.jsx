import React from "react";
import { useTripContext } from "../../context/TripContext";
import { useAttractions } from "../../api/attractionFinder";

const cardStyle = {
  border: "1px solid #e6e6e6",
  borderRadius: 8,
  padding: 12,
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  background: "#fff",
};

const imgStyle = {
  width: 120,
  height: 80,
  objectFit: "cover",
  borderRadius: 6,
  background: "#f2f2f2",
};

export default function Attractions() {
  const { tripData, setTripData } = useTripContext();
  const { data, isLoading, isError, refetch } = useAttractions(tripData?.destination);
  const attractions = data?.attractions || data?.data?.attractions || [];
  const loading = isLoading;
  const error = isError ? 'Failed to load attractions' : null;

  function addToItinerary(item) {
    setTripData((prev) => {
      const exists = (prev.itinerary || []).some((i) => i.name === item.name);
      if (exists) return prev;
      return { ...prev, itinerary: [...(prev.itinerary || []), item] };
    });
  }

  const alreadyAdded = (name) => (tripData.itinerary || []).some((i) => i.name === name);

  return (
    <div style={{ padding: 16 }}>
      <h2>Attractions</h2>

      {!tripData?.destination ? (
        <p>Please choose a destination to load attractions.</p>
      ) : (
        <div style={{ marginBottom: 12 }}>
          <strong>Destination:</strong> {tripData.destination}
          <button style={{ marginLeft: 12 }} onClick={() => refetch()} disabled={loading}>
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      )}

      {loading && <p>Loading attractions…</p>}
      {error && (
        <div style={{ color: "#b00020", marginBottom: 12 }}>
          Error: {error}
        </div>
      )}

      {!loading && !error && attractions.length === 0 && tripData?.destination && (
        <p>No attractions found for this destination.</p>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {attractions.map((a, idx) => (
          <div key={a.name || idx} style={cardStyle}>
            <img
              src={a.image || a.photo || ""}
              alt={a.name}
              style={imgStyle}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <h3 style={{ margin: 0 }}>{a.name}</h3>
                <div style={{ textAlign: "right", minWidth: 90 }}>
                  <div style={{ fontSize: 12, color: "#555" }}>{a.category}</div>
                  {a.visit_duration && (
                    <div style={{ fontSize: 12, color: "#333" }}>{a.visit_duration}</div>
                  )}
                </div>
              </div>

              <p style={{ marginTop: 8, marginBottom: 8, color: "#444" }}>
                {a.description ? a.description.slice(0, 220) : "No description available."}
              </p>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => addToItinerary(a)} disabled={alreadyAdded(a.name)}>
                  {alreadyAdded(a.name) ? "Added" : "Add to itinerary"}
                </button>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(a.name + " " + (tripData.destination || ""))}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
