<template>
    <div id="budget-list-container">
        <h1>My Budgets</h1>
        <div id="budget-list">            
            <budget-card v-for="budget in budgets"
                v-bind:key="budget.id"
                v-bind:budget="budget" />
        </div>
        <add-budget />
    </div>
</template>

<script>
import budgetService from '../services/budgetService';
import budgetCard from './budgetCard'
import addBudget from './addBudget'

export default {
    name: 'budgetList',
    data: function() {
        return {
            budgets: []
        }
    },
    components: {
        budgetCard,
        addBudget
    },
    mounted: function() {
        var self = this;

        budgetService.getAllBudgets()            
            .then(response => self.budgets = response.data.data);
    }
}
</script>
<style scoped>
    #budget-list-container {
        margin: 0 auto;
        max-width: 960px;
    }
    #budget-list {
        padding:15px 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>