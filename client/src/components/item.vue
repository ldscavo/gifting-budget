<template>
  <div class="item" v-bind:class="{ 'unpurchased': !purchased }">
    <input type="checkbox" v-model="purchased" v-on:change="update" />
    <span class="name">{{ item.name }}</span>
    <span class="price">{{ parseFloat(item.price) | currency }}</span>
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
    update: async function() {
      try {
        await itemService.updateItem(
          this.budgetId,
          this.recipientId,
          this.item.id,
          this.item.name,
          this.item.price,
          this.purchased);

        this.item.purchased = this.purchased;
      }
      catch (error) {
        this.purchased = !this.purchased
      }
    }
  }
}
</script>

<style scoped>
.item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.item:hover {
  background-color: #e2e2e2;
  /*color: #fff;*/
}
.unpurchased {
  font-style: italic;
  color: #959595;
}
input[type="checkbox"] {
  border:5px solid black;
}
</style>
