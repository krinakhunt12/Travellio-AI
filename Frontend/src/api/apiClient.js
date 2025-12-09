export const BASE_URL = 'http://localhost:5000';

async function handleResponse(res) {
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) {
      const err = data.error || data.message || res.statusText || 'API error';
      throw new Error(err);
    }
    return data;
  } catch (err) {
    // if JSON.parse failed, but status ok, return raw text
    if (res.ok) return text;
    throw err;
  }
}

export async function apiFetch(path, opts = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const finalOpts = { credentials: 'include', ...opts };
  if (finalOpts.body && typeof finalOpts.body === 'object') {
    finalOpts.headers = { 'Content-Type': 'application/json', ...(finalOpts.headers || {}) };
    finalOpts.body = JSON.stringify(finalOpts.body);
  }
  const res = await fetch(url, finalOpts);
  return handleResponse(res);
}

export default { BASE_URL, apiFetch };
