import { useMutation } from '@tanstack/react-query';
import { apiFetch, BASE_URL } from './apiClient';

export async function planItinerary(attractions) {
  if (!Array.isArray(attractions)) throw new Error('Attractions array required');
  const json = await apiFetch(`${BASE_URL}/api/itinerary/plan`, { method: 'POST', body: { attractions } });
  return json;
}

export function usePlanItinerary(options = {}) {
  return useMutation((attractions) => planItinerary(attractions), { ...options });
}

export default { planItinerary, usePlanItinerary };
