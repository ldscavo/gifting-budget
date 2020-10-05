<template>
  <div class="recipient-summary">
    <span class="name">{{ recipient.name }}</span>
    <span class="totals">
      <span class="spent">Spent: {{ total | currency }} out of {{ recipient.amount | currency }}</span>
      <span class="remaining">
        Remaining: <span v-bind:class="{ 'over-budget': remaining() < 0 }">{{ remaining() | currency }}</span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: "recipientMinimized",
  props: {
    recipient: Object,
    total: Number
  },
  methods: {
    remaining: function() {
      return this.recipient.amount - this.total
    }
  }
}
</script>

<style scoped>
.recipient-summary {
  width: 100%;
  margin: 15px;
}
.name {
  font-size: 1.1rem;
  font-weight: bold;
}
.spent::before, .spent::after {
  content: " \007C ";
}
@media only screen and (max-width: 550px) {
  .recipient-summary {
    display: flex;
    justify-content: space-around;
  }        
  .name {
    margin-bottom: 10px;
    margin-right: 15px;
  }
  .spent {
    margin-bottom: 5px;
  }
  .name, .spent, .remaining {
    display: block;
  }
  .spent::before, .spent::after {
    content: "";
  }
}
</style>