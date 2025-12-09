import { useMutation, useQuery } from '@tanstack/react-query';
import { apiFetch, BASE_URL } from './apiClient';
export async function calculateBudget(payload) {
  // payload: { destination, nights, travellers, preferences, budget }
  const res = await apiFetch(`${BASE_URL}/api/budget/calculate`, { method: 'POST', body: JSON.stringify(payload) });
  return json;
}

// Mutation version (explicit call)
export function useCalculateBudget(options = {}) {
  return useMutation((payload) => calculateBudget(payload), { ...options });
}

// Query version (for auto-run when payload is available)
export function useBudgetQuery(keyPayload, options = {}) {
  return useQuery(['budget', keyPayload], () => calculateBudget(keyPayload), { enabled: !!keyPayload?.destination, ...options });
}

export default { calculateBudget, useCalculateBudget, useBudgetQuery };
