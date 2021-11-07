<template>
  <div class="budget-details">
    <h1>{{ budget.name }}</h1>
    <div class="amount">
      Budgeted: {{ budget.amount | currency }}
    </div>
    <div class="allotted">
      Allotted: {{ totalAllocated() | currency }}
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
import _ from 'lodash';

export default {
  name: "budgetDetails",
  props: {
    budget: Object
  },
  methods: {
    totalAllocated: function() {
      return _.sumBy(this.budget.recipients,recipient =>
        recipient.amount !== '' ? parseFloat(recipient.amount) : 0)
    },
    totalSpent: function() {
      return _.sumBy(this.budget.recipients,
        recipient => _.sumBy(recipient.items,
          item => item.purchased ? parseFloat(item.price) : 0))
    },
    remainingBalance: function() {
      return this.budget.amount- this.totalSpent()
    }
  }
}
</script>

<style scoped>
.budget-details {    
  border:1px solid #a2a2a2;
  border-top: none;
  background-color: #fafafa;
  padding:15px 5px;
  margin-bottom: 10px;
}
</style>
