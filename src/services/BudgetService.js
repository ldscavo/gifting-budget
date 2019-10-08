import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default {
    getBudget: (id) => axios.get(`/api/budgets/${id}`)    
}