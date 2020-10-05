<template>
  <div class="recipient-details">
    <h3>{{ recipient.name }}</h3>
    <div>
      <div>
        <div>Budgeted: {{ recipient.amount | currency }}</div>
        <div>Spent: {{ total | currency }}</div>
        <div>
          Remaining:
          <span v-bind:class="{ 'over-budget': remaining < 0 }">
            {{ remaining | currency }}
          </span>
        </div>
      </div>
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
  margin:15px 5px;
}
</style>