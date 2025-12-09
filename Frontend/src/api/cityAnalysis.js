import { useQuery } from '@tanstack/react-query';
import { apiFetch, BASE_URL } from './apiClient';

export async function getCityAnalysis(payload) {
  if (!payload || !payload.city) throw new Error('City is required');
  const json = await apiFetch(`${BASE_URL}/api/city-analysis`, { method: 'POST', body: payload });
  return json;
}

export function useCityAnalysis(city, options = {}) {
  return useQuery(['cityAnalysis', city], () => getCityAnalysis({ city }), { enabled: !!city, ...options });
}

export default { getCityAnalysis, useCityAnalysis };

