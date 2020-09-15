<template>
  <div>
    <form class="add-entry" v-on:submit.prevent="addItem" v-if="isAdding">
      <div class="add-entry-field">
        <label for="item-name">Name:</label>
        <input class="form-input" type="text" v-model="name" id="item-name" placeholder="Item Name" />
      </div>
      <div class="add-entry-field">
        <label for="item-price">Price:</label>
        $<input class="form-input" type="number" v-model="price" id="item-price" step="0.01" />
      </div>   
      <div class="add-entry-field" v-if="!loading">
        <button type="reset" v-on:click="toggleForm">Cancel</button>
        <button type="submit">Add Item &raquo;</button>
      </div>
      <beat-loader
        v-if="loading"
        color="#973735" />
    </form>    
    <a v-if="!isAdding" v-on:click="toggleForm">+ Add Item</a>
  </div>
</template>

<script>
import itemService from '../services/itemService';

export default {
  name: "addItem",
  props: {
    items: Array,
    budgetId: Number,
    recipientId: Number
  },
  data: function() {
    return {
      name: "",
      price: 0.00,
      isAdding: false,
      loading: false
    }
  },
  methods: {
    addItem: async function() {
      if (this.name != "" && this.price > 0) {
        this.loading = true;

        let response = await itemService.createItem(this.budgetId, this.recipientId, this.name, this.price);
          
        this.items.push(response.data.data);
        this.clear();        
      } 
    },
    clear() {
      this.name = "";
      this.price = 0.00;
      this.loading = false;
    },
    toggleForm: function() {
      this.isAdding = !this.isAdding;
    }
  }
}
</script>