import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default {
    createItem: (budgetId, recipientId, name, price) =>
        axios.post(`/api/budgets/${budgetId}/recipients/${recipientId}/items`, {name, price}),
    updateItem: (budgetId, recipientId, id, name, price, purchased) =>
        axios.patch(`/api/budgets/${budgetId}/recipients/${recipientId}/items/${id}`, {name, price, purchased})
}