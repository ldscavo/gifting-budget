<template>
    <div class="budget-details">
        <h1>{{ budget.name }}</h1>
        <div class="amount">
            Budgeted: {{ totalAmount() | currency }}
        </div>
        <div class="spent">
            Spent: {{ totalSpent() | currency }}
        </div>
        <div class="remaining" v-bind:class="{ 'over-budget': remainingBalance() < 0 }">
            Remaining: {{ remainingBalance() | currency }}
        </div>        
    </div>
</template>

<script>
export default {
    name: "BudgetDetails",
    props: {
        budget: Object
    },
    methods: {
        totalAmount: function() {
            return _.sumBy(this.budget.recipients, recipient => recipient.amount)
        },
        totalSpent: function() {
            return _.sumBy(this.budget.recipients, recipient => _.sumBy(recipient.items, item => item.purchased ? item.price : 0))
        },
        remainingBalance: function() {
            return this.totalAmount() - this.totalSpent()
        }
    }
}
</script>

<style scoped>
.budget-details {    
    border:1px solid #a2a2a2;
    border-top: none;
    /*box-shadow: 1px 2px #888;*/
    background-color: #fafafa;
    padding:15px 5px;
}
.over-budget {
    color:red;
    font-weight: bold;
}
</style>
