import http from '../infrastructure/http';

export default {
  getAllBudgets: () => http.get('/api/budgets'),
  getBudget: (id) => http.get(`/api/budgets/${id}/expanded`),
  createBudget: (name, amount) => http.post('/api/budgets', {name, amount})
}