<template>
  <div class="item" v-bind:class="{ 'purchased': purchased }">
    <input type="checkbox" v-model="purchased" v-on:change="update" />
    {{ item.name }} - {{ parseFloat(item.price) | currency }}
  </div>
</template>

<script>
import itemService from '../services/itemService';

export default {
  name: "item",
  props: {
    budgetId: Number,
    recipientId: Number,
    item: Object
  },
  data: function() {
    let self = this;
    return {
      purchased: self.item.purchased
    }
  },
  methods: {
    update: function() {
      let self = this;
      itemService.updateItem(self.budgetId, self.recipientId, self.item.id, self.item.name, self.item.price, self.purchased)
        .then(() => self.item.purchased = self.purchased)
        .catch(() => self.purchased = !self.purchased);
    }
  }
}
</script>

<style scoped>
.item {
  width:80%;
  margin: 5px auto;
  border:1px solid #000;
  padding:10px 15px;
}
.purchased {
  background-color: aquamarine;
}
</style>
