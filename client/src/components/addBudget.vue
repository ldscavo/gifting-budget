<template>
  <div class="container">        
    <form class="add-entry" v-if="isAdding" v-on:submit.prevent="addBudget">
      <div class="add-entry-field">
        <label for="name">Budget Name:</label>
        <input class="form-input" type="text" v-model="name" id="name" placeholder="My Event" />
      </div>
      <div class="add-entry-field">
        <label for="amount">Budget Amount:</label>
        <input class="form-input" type="number" step="1" v-model="amount" id="amount" />
      </div>
      <div class="add-entry-field" v-if="!loading">
        <button type="reset" v-on:click="toggleForm">Cancel</button>
        <button type="submit">Create Budget &raquo;</button>                
      </div>
      <beat-loader
        v-if="loading"
        color="#973735" />
    </form>
    <a v-if="!isAdding" v-on:click="toggleForm">+ Add New Budget</a>
  </div>
</template>

<script>
import budgetService from '../services/budgetService';

export default {
  name: 'addBudget',
  data: function() {
    return {
      isAdding: false,
      name: "",
      amount: 0,
      loading: false
    }
  },
  methods: {
    toggleForm: function() {
      this.isAdding = !this.isAdding;
    },
    addBudget: async function() {
      this.loading = true;

      let response = await budgetService.createBudget(this.name, this.amount);
      
      this.$router.push({ path: `/budget/${response.data.data.id}`});
    }
  }
}
</script>

<style scoped>
.add-entry {
  margin: 0 auto;
  max-width: 700px;
  padding:30px 15px;
  border:1px solid #a2a2a2;
  background-color: #fafafa;
}    
</style>