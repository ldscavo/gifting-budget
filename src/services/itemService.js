import http from '../infrastructure/http';

export default {
    createItem: (budgetId, recipientId, name, price) =>
        http.post(`/api/budgets/${budgetId}/recipients/${recipientId}/items`, {name, price}),
    updateItem: (budgetId, recipientId, id, name, price, purchased) =>
        http.patch(`/api/budgets/${budgetId}/recipients/${recipientId}/items/${id}`, {name, price, purchased})
}