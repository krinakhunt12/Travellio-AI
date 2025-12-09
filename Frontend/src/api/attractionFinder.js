import { useQuery } from '@tanstack/react-query';
import { apiFetch, BASE_URL } from './apiClient';

export async function fetchAttractions(city) {
  if (!city) throw new Error('City is required');
  const json = await apiFetch(`${BASE_URL}/api/attractions`, { method: 'POST', body: { city } });
  return json.data || json;
}

export function useAttractions(city, options = {}) {
  return useQuery(['attractions', city], () => fetchAttractions(city), { enabled: !!city, ...options });
}

export default { fetchAttractions, useAttractions };
