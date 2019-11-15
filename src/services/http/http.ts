import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = apiUrl;

axios.interceptors.request.use(config => {
  config.params = { ...config.params, _format: 'json' };
  return config;
});

export const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch
};
