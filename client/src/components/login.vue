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
      <div class="form-error" v-if="error">
        <span>{{ error }}</span>
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
import auth from '../services/authService';

export default {
  name: 'login',
  data: function() {
    return {
      email: "",
      password: "",
      error: ""
    }
  },
  methods: {
    login: async function() {
      try {
        let response = await auth.login(this.email, this.password);
      
        localStorage.setItem("token", response.data.token);
        this.$router.push({ path: '/budgets' });
      }
      catch (error) {
        this.error = error.response.data.error;
      }
    }
}
}
</script>