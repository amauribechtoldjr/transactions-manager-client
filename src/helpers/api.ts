import axios from 'axios';

import store from '../store/store';
import { CombinedReducersState } from '../store/reducers';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(function(config) {
  let token = (store.getState() as CombinedReducersState).auth.token;

  if (!token) {
    token = localStorage.getItem('token');
  }

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  config.headers['Content-type'] = 'application/json';

  return config;
});

export default api;
