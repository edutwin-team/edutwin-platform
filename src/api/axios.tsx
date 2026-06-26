import axios from 'axios';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

api.interceptors.request.use((config) => {
  let csrfToken = null;

  if (typeof document !== 'undefined') {
    const match = document.cookie.split('; ').find((row) => row.startsWith('csrftoken='));

    csrfToken = match?.split('=')[1];
  }

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  return config;
});

export default api;
