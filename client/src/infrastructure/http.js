import axios from 'axios';

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Access-Control-Allow-Headers': '*'
  }
});