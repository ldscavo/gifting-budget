import axios from 'axios';

let http = 
  axios.create({
    baseURL: process.env.VUE_APP_API_URL
  });

let headers = () =>
  ({
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

export default {
  get: url => http.get(url, headers()),

  post: (url, data) => http.post(url, data, headers()),

  patch: (url, data) => http.patch(url, data, headers()),

  delete: url => http.delete(url, headers())
};