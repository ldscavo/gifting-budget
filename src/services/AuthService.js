import axios from 'axios';

export default {
    login: (email, password) => axios.post('/api/login', {email, password})    
}