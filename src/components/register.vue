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
      passwordconfirm: ''
    }
  },
  methods: {
    register: function() {
      var self = this;

      auth.register(self.email, self.password, self.passwordconfirm)
        .then(response => {
          localStorage.setItem("token", response.data.token);
          self.$router.push({ path: '/budgets' })
        })
        .catch(error => alert(error.response.data.error));
    }
  }
}
</script>