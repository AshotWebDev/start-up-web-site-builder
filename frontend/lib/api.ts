// frontend/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export const api = {
  async get(endpoint: string, token?: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    });
    if (!res.ok) throw new Error('API error');
    return res.json();
  },

  async post(endpoint: string, body: any, token?: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('API error');
    return res.json();
  },
};