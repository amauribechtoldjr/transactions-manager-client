import axios from 'axios';

import store from '../store/store';
import { CombinedReducersState } from '../store/reducers';

const BASEURL_API = process.env.REACT_APP_BASEURL_API;
console.log(process.env.REACT_APP_BASEURL_API);

const api = axios.create({
  baseURL: BASEURL_API,
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
