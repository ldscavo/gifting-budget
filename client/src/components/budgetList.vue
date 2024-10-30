<template>
  <div class="budget-list-container">
    <h1 class="title is-4">My Budgets</h1>
    <Test />
    <clip-loader v-if="loading" size="80" color="#973735" />
    <div class="grid">
      <budget-card-v2 v-for="budget in budgets" v-bind:key="budget.id" v-bind:budget="budget" />
    </div>
    <add-budget-v2 />
  </div>
</template>

<script>
import budgetService from '../services/budgetService';
import budgetCard from './budgetCard.vue'
import budgetCardV2 from './budgetCardV2.vue'
import addBudget from './addBudget.vue'
import addBudgetV2 from './addBudgetV2.vue'

export default {
  name: 'budgetList',
  data: function() {
    return {
      loading: true,
      budgets: []
    }
  },
  components: {
    budgetCard,
    budgetCardV2,
    addBudget,
    addBudgetV2
  },
  mounted: async function() {
    let response = await budgetService.getAllBudgets();
    
    this.budgets = response.data.data;
    this.loading = false;    
  }
}
</script>

<style scoped>
.budget-list-container {
  margin: 0 auto;
  max-width: 1152px;
}

h1 {
  margin: 10px auto;
}
</style>