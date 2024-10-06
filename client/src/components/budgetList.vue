<template>
  <div id="budget-list-container">
    <h1 class="title">My Budgets</h1>
    <clip-loader
      v-if="loading"
      size="80"
      color="#973735" />
    <div id="budget-list">            
      <budget-card v-for="budget in budgets"
          v-bind:key="budget.id"
          v-bind:budget="budget" />
    </div>
    <add-budget-v2 />
  </div>
</template>

<script>
import budgetService from '../services/budgetService';
import budgetCard from './budgetCard'
import addBudget from './addBudget'
import addBudgetV2 from './addBudgetV2'

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
#budget-list-container {
  margin: 0 auto;
  max-width: 960px;
}

h1 {
  margin: 10px auto;
}

#budget-list {
  padding:15px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>