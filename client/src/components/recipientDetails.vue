<template>
  <div class="recipient-details">
    <h3>{{ recipient.name }}</h3>
    <div>
      <table>
        <tr>
          <th>Budgeted: </th>
          <td>{{ recipient.amount | currency }}</td>
        </tr>
        <tr>
          <th>Spent: </th>
          <td>{{ total | currency }}</td>
        </tr>
        <tr>
          <th>Remaining: </th>
          <td v-bind:class="{ 'over-budget': remaining < 0 }">
            {{ remaining | currency }}
          </td>
        </tr>
      </table>
      <div class="items-container" v-if="recipient.items">
        <item
          v-for="item in recipient.items"
          v-bind:key="item.name"
          v-bind:budgetId="budgetId"
          v-bind:recipientId="recipient.id"
          v-bind:item="item" />
        <div v-if="recipient.items.length == 0">
          <em>Nothing here yet!</em>
        </div>
      </div>
      <add-item
        v-bind:items="recipient.items"
        v-bind:budgetId="budgetId" 
        v-bind:recipientId="recipient.id" />
    </div>
  </div>
</template>

<script>
import addItem from './addItem'
import item from './item'

export default {
  name: 'recipientDetails',
  props: {
    recipient: Object,
    budgetId: Number,
    total: Number,
    remaining: Number
  },
  components: {
    addItem,
    item
  }
}
</script>

<style scoped>
.recipient-details {
  width: 100%;
  text-align: center;
}
.items-container {
  margin:15px auto;
  border: 1px solid #a2a2a2;
  width: 85%;
}
@media only screen and (max-width: 550px) {
  .items-container {
    width: 98%;
  }
}
table { margin: 0 auto; }
th { text-align: left; }
td { text-align: right; }
th, td { padding: 1px 10px; }
</style>