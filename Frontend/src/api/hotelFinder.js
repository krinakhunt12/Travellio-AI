import { useQuery } from '@tanstack/react-query';
import { apiFetch, BASE_URL } from './apiClient';

export async function getHotels(city) {
  if (!city) throw new Error('City is required');
  const q = new URLSearchParams({ city });
  const json = await apiFetch(`${BASE_URL}/api/hotels?${q.toString()}`);
  return json;
}

export function useHotels(city, options = {}) {
  return useQuery(['hotels', city], () => getHotels(city), { enabled: !!city, ...options });
}

export default { getHotels, useHotels };
