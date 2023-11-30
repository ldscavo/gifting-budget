<template>
  <div id="form-page">
    <form v-on:submit="register">
      <h2>Register</h2>
      <div class="form-section">
        <label for="email">Email:</label>
        <input id="email" class="form-input text" v-model="email" placeholder="email@example.com" />
      </div>
      <div class="form-section">
        <label for="password">Password:</label>
        <input id="password" class="form-input text" v-model="password" type="password" />
      </div>
      <div class="form-section">
        <label for="passwordconfirm">Confirm Password:</label>
        <input id="passwordconfirm" class="form-input text" v-model="passwordconfirm" type="password" />
        <div class="warning" v-if="password !== passwordconfirm">Passwords do not match!</div>
      </div>
      <div class="form-error" v-if="error">
        <span>{{ error }}</span>
      </div>
      <div class="form-section">
        <button type="submit" class="form-input">Register &raquo;</button>
      </div>
    </form>
  </div>    
</template>

<script>
import auth from '../services/authService';

export default {
  name: 'register',
  data: function() {
    return {
      email: '',
      password: '',
      passwordconfirm: '',
      error: ''
    }
  },
  methods: {
    register: async function() {
      try {
        let response = await auth.register(this.email, this.password, this.passwordconfirm);
        
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