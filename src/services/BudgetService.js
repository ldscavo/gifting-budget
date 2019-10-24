import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default {
    getAllBudgets: () => axios.get('/api/budgets'),
    getBudget: (id) => axios.get(`/api/budgets/${id}?expand=1`)
}