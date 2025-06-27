export default function authFetch(url: string, options: RequestInit = {}) {
  if (typeof window === "undefined") return fetch(url, options); // SSR fallback
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetch(url, { ...options, headers });
} 