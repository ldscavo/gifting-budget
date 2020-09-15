import axios from 'axios';

export default {
  http: axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      'Access-Control-Allow-Headers': '*'
    }
  }),
  
  headers() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  },

  get(url) {
    return this.http.get(url, this.headers());
  },

  post(url, data) {
    return this.http.post(url, data, this.headers());
  },

  patch(url, data) {
    return this.http.patch(url, data, this.headers());
  },

  delete(url) {
    return this.http.delete(url, this.headers());
  }
};