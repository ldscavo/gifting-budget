<template>
    <div id="login-form">
        <form v-on:submit="login">
            <h2>Login</h2>
            <div class="form-section">
                <label for="email">Email:</label>
                <input id="email" v-model="email" placeholder="email@example.com" />
            </div>
            <div class="form-section">
                <label for="password">Password:</label>
                <input id="password" v-model="password" type="password" />
            </div>
            <div class="form-section">
                <button type="submit">Login &raquo;</button>
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
                    self.$router.push({ path: '/budget/4' })
                });
        }
    }
}
</script>

<style>
    #login-form {
        max-width: 650px;
        margin:0 auto;

        border:1px solid #a2a2a2;
        border-top: none;
        
        background-color: #fafafa;
        padding:15px 5px;
    }
    .form-section {
        padding:10px 15px;
    }
    .form-section label {
        display: block;
    }
</style>