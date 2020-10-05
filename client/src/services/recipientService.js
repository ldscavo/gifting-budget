import http from '../infrastructure/http';

export default {
  createRecipient: (budgetId, name, amount) =>
    http.post(`/api/budgets/${budgetId}/recipients`, { name, amount }),
  
  editRecipient: (budgetId, id, name, amount) => 
    http.patch(`/api/budgets/${budgetId}/recipients/${id}`, { name, amount })
}