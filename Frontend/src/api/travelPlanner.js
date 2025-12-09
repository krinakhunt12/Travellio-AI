import { useMutation } from '@tanstack/react-query';
import { apiFetch, BASE_URL } from './apiClient';

export async function generateTravelPlan(payload) {
  // API returns JSON response text — apiFetch will parse JSON
  const json = await apiFetch(`${BASE_URL}/api/travel/generate`, { method: 'POST', body: payload });
  return json;
}

export function useGenerateTravelPlan(options = {}) {
  return useMutation((payload) => generateTravelPlan(payload), { ...options });
}

export default { generateTravelPlan, useGenerateTravelPlan };
