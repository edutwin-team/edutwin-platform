import api from './axios';

export const initCSRF = async () => {
  const res = await api.get('/csrf/');

  const token = res.data.csrfToken;

  api.defaults.headers.common['X-CSRFToken'] = token;
};
