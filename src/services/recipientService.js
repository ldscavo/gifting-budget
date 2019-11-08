import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default {
    createRecipient: (budgetId, name, amount) =>
        axios.post(`/api/budgets/${budgetId}/recipients`, {name, amount}),
}