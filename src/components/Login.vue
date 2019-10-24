<template>
    <div id="form-page">
        <form v-on:submit="login">
            <h2>Login</h2>
            <div class="form-section">
                <label for="email">Email:</label>
                <input id="email" class="form-input text" v-model="email" placeholder="email@example.com" />
            </div>
            <div class="form-section">
                <label for="password">Password:</label>
                <input id="password" class="form-input text" v-model="password" type="password" />
            </div>
            <div class="form-section">
                <button type="submit" class="form-input">Login &raquo;</button>                
            </div>
            <div class="form-section">
                <router-link v-bind:to="{ name: 'register' }">No account? Click here to register!</router-link>
            </div>
        </form>
    </div>    
</template>

<script>
import auth from '../services/AuthService';

export default {
    name: 'Login',
    data: function() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login: function() {
            var self = this;

            auth.login(self.email, self.password)
                .then(response => {
                    localStorage.setItem("token", response.data.token);
                    self.$router.push({ path: '/budgets' })
                })
                .catch(error => alert(error.response.data.error));
        }
    }
}
</script>

<style>

</style>