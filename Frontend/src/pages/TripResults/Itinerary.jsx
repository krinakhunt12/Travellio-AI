import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { usePlanItinerary } from '../../api/itineraryPlanner';

export default function Itinerary() {
  const { tripData, setTripData } = useTripContext();
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState(null);
  const mutation = usePlanItinerary({
    onSuccess(data) {
      const itinerary = data.itinerary || data.data?.itinerary || data;
      setGenerated(itinerary);
      setTripData((prev) => ({ ...prev, generatedItinerary: itinerary }));
    },
    onError(err) {
      setError(err.message || String(err));
    }
  });

  // prefer master plan daywise itinerary if available
  const attractions = tripData?.masterPlan?.daywise_itinerary || tripData?.itinerary || [];

  function handleGenerate() {
    if (!attractions.length) return setError('No attractions selected');
    setError(null);
    mutation.mutate(attractions);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Itinerary</h2>

      {!attractions.length ? (
        <p>No attractions added yet. Add attractions from the Attractions tab.</p>
      ) : (
        <div>
          <p>{attractions.length} attractions selected.</p>
          <button onClick={handleGenerate} disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Generating…' : 'Generate Optimized Itinerary'}
          </button>
        </div>
      )}

      {error && <div style={{ color: '#b00020', marginTop: 12 }}>{error}</div>}

      {generated && (
        <div style={{ marginTop: 16 }}>
          <h3>Generated Itinerary</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(generated, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
