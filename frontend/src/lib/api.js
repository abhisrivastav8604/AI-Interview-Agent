const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

// ✅ Ensure fallback is NEVER empty
export const API_BASE_URL = rawApiUrl && rawApiUrl.length > 0
  ? rawApiUrl.replace(/\/+$/, '')
  : 'http://localhost:5000'; // 🔥 fallback fix

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};