<template>
    <div id="budget-list">
        <div v-for="budget in budgets" v-bind:key="budget.id" class="budget">
            <router-link v-bind:to="{ name: 'budget', params: {id: budget.id }}">{{ budget.name }}</router-link>
        </div>
    </div>
</template>

<script>
import budgetService from '../services/BudgetService';

export default {
    name: 'BudgetList',
    data: function() {
        return {
            budgets: []
        }
    },
    mounted: function() {
        var self = this;

        budgetService.getAllBudgets()
            .then(response => self.budgets = response.data.data);
    }
}
</script>

<style>

</style>