import http from '../infrastructure/http';

export default {
  register: (email, password, passwordconfirm) =>
    http.post('/api/register', { email, password, passwordconfirm }),

  login: (email, password) =>
    http.post('/api/login', { email, password })
}