import http from '../infrastructure/http';

export default {
  getAllBudgets: () =>
    http.get('/api/budgets'),

  getBudget: (id) =>
    http.get(`/api/budgets/${id}/expanded`),

  createBudget: (name) =>
    http.post('/api/budgets', {name})
}
