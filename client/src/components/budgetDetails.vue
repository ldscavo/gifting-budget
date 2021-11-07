<template>
  <div class="budget-details">
    <h1>{{ budget.name }}</h1>
    <table>
      <tr>
        <th>Budgeted: </th>
        <td>{{ budget.amount | currency }}</td>
      </tr>
      <tr>
        <th>Allotted: </th>
        <td>{{ totalAllocated() | currency }}</td>
      </tr>
      <tr>
        <th>Spent: </th>
        <td>{{ totalSpent() | currency }}</td>
      </tr>
      <tr>
        <th>Remaining: </th>
        <td>{{ remainingBalance() | currency }}</td>
      </tr>
    </table>
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
  padding: 5px;
  padding-bottom: 15px;
  margin-bottom: 10px;
}
h1 {
  margin: 10px auto;
}
table { margin: 0 auto; }
th { text-align: left; }
td { text-align: right; }
th, td { padding: 1px 10px; }
</style>
