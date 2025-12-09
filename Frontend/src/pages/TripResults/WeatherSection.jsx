import React from "react";
import { useTripContext } from "../../context/TripContext";
import { useCityAnalysis } from "../../api/cityAnalysis";

export default function WeatherSection() {
  const { tripData } = useTripContext();
  const { data: analysis, isFetching: loading, error, refetch } = useCityAnalysis(tripData?.destination);
  // useCityAnalysis handles fetching when destination exists

  const renderField = (key, val) => {
    if (val == null) return null;
    if (typeof val === "string" || typeof val === "number") {
      return (
        <div style={{ marginBottom: 8 }}>
          <strong>{key}:</strong> <span>{val}</span>
        </div>
      );
    }
    if (Array.isArray(val)) {
      return (
        <div style={{ marginBottom: 8 }}>
          <strong>{key}:</strong>
          <ul style={{ marginTop: 6 }}>
            {val.map((it, i) => (
              <li key={i} style={{ marginBottom: 4 }}>{typeof it === 'object' ? JSON.stringify(it) : it}</li>
            ))}
          </ul>
        </div>
      );
    }
    if (typeof val === "object") {
      return (
        <div style={{ marginBottom: 8 }}>
          <strong>{key}:</strong>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>{JSON.stringify(val, null, 2)}</pre>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>City Analysis & Weather</h2>

      {!tripData?.destination ? (
        <p>Please choose a destination to see city analysis.</p>
      ) : (
        <div style={{ marginBottom: 12 }}>
          <strong>Destination:</strong> {tripData.destination}
          <button style={{ marginLeft: 12 }} onClick={() => refetch()} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      )}

      {loading && <p>Loading city analysis…</p>}
      {error && <div style={{ color: '#b00020' }}>Error: {error}</div>}

      {analysis && !loading && (
        <div style={{ display: 'grid', gap: 12 }}>
          {Object.keys(analysis).length === 0 && (
            <p>No analysis data returned.</p>
          )}

          {Object.entries(analysis).map(([k, v]) => (
            <div key={k} style={{ padding: 12, border: '1px solid #eee', borderRadius: 8, background: '#fff' }}>
              <h4 style={{ marginTop: 0 }}>{k}</h4>
              {renderField(k, v)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
