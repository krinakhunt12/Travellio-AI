import React, { useEffect, useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { useHotels } from '../../api/hotelFinder';
import { useBudgetQuery } from '../../api/budgetCalculator';
import { useGenerateTravelPlan, useGenerateMasterPlan } from '../../api/travelPlanner';

export default function Summary() {
  const { tripData } = useTripContext();
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const { data: hotelsData, isLoading: loadingHotels, isError: hotelsError, refetch: refetchHotels } = useHotels(tripData?.destination);
  const hotels = hotelsData?.hotels || hotelsData || [];

  const nights = (() => {
    if (!tripData?.startDate || !tripData?.endDate) return undefined;
    const s = new Date(tripData.startDate);
    const e = new Date(tripData.endDate);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : undefined;
  })();

  const budgetKey = tripData?.destination ? { destination: tripData.destination, nights, travellers: { adults: tripData.adults, children: tripData.children }, preferences: tripData.selectedInterests, budget: tripData.budget } : null;
  const { data: budgetData, isLoading: loadingBudget } = useBudgetQuery(budgetKey, { enabled: !!budgetKey });
  const budget = budgetData?.budget || budgetData || null;

  const generateMutation = useGenerateTravelPlan({
    onSuccess(data) {
      setPlan(data);
    },
    onError(err) {
      setError(err.message || String(err));
    }
  });

  const { setTripData } = useTripContext();

  const masterMutation = useGenerateMasterPlan({
    onSuccess(data) {
      setPlan(data);
      // persist into trip context and localStorage in a normalized way
      try {
        const planPayload = data?.data || data;
        setTripData((prev) => ({ ...prev, masterPlan: planPayload, destination: planPayload?.metadata?.destination || prev.destination, attractions: planPayload?.data?.attractions || planPayload?.attractions || prev.attractions, itinerary: planPayload?.data?.daywise_itinerary || planPayload?.daywise_itinerary || prev.itinerary, hotels: planPayload?.data?.hotels || planPayload?.hotels || prev.hotels, costBreakdown: planPayload?.data?.final_budget_breakdown || planPayload?.final_budget_breakdown || prev.costBreakdown }));
        localStorage.setItem('aiItinerary', JSON.stringify(data));
      } catch (e) {
        // ignore
      }
    },
    onError(err) {
      setError(err.message || String(err));
    }
  });

  // data is fetched via the hooks above; refetch available if needed

  function handleGeneratePlan() {
    setError(null);
    const payload = {
      departureCity: tripData.departureCity || '',
      destination: tripData.destination,
      travelDates: `${tripData.startDate || ''} - ${tripData.endDate || ''}`,
      travellers: { adults: tripData.adults, children: tripData.children },
      budget: tripData.budget,
      interests: tripData.selectedInterests,
      comfort: tripData.comfort || '',
    };

    // call master plan mutation to get the integrated plan from backend master agent
    masterMutation.mutate(payload);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Trip Summary</h2>

      {error && <div style={{ color: '#b00020' }}>{error}</div>}

      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8, background: '#fff' }}>
          <h3>Hotels</h3>
          {loadingHotels ? (
            <p>Loading hotels…</p>
          ) : (
            <div>
              {hotels && hotels.length ? (
                hotels.map((h, i) => (
                  <div key={h.name || i} style={{ marginBottom: 8 }}>
                    <div style={{ fontWeight: 600 }}>{h.name || h.title || 'Hotel'}</div>
                    {h.price && <div style={{ fontSize: 13, color: '#666' }}>Approx: {h.price}</div>}
                  </div>
                ))
              ) : (
                <p>No hotels found.</p>
              )}
            </div>
          )}
        </div>

        <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8, background: '#fff' }}>
          <h3>Budget</h3>
          {loadingBudget ? <p>Calculating…</p> : <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(budget, null, 2)}</pre>}
        </div>

        <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8, background: '#fff' }}>
          <h3>Full AI Travel Plan</h3>
          <button onClick={handleGeneratePlan} disabled={masterMutation?.isLoading}>{masterMutation?.isLoading ? 'Generating…' : 'Generate Full Plan'}</button>
          {plan && <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{JSON.stringify(plan, null, 2)}</pre>}
        </div>
      </div>
    </div>
  );
}
