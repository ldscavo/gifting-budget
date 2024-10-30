import axios from 'axios';

let http = 
  axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });

let headers = () =>
  ({
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
export default {
  get<T>(url: string) {
    return http.get<T>(url, headers());
  },

  post<T>(url: string, data: any) {
    return http.post<T>(url, data, headers());
  },

  patch<T>(url: string, data: any) {
    return http.patch<T>(url, data, headers());
  },

  delete(url: string) {
    http.delete(url, headers());
  }
};