import axios from 'axios';

export default {
    register: (email, password, passwordconfirm) => axios.post('/api/register', {email, password, passwordconfirm}),
    login: (email, password) => axios.post('/api/login', {email, password})  
}