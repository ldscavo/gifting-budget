<template>
  <div class="item" v-bind:class="{ 'unpurchased': !purchased }">
    <input type="checkbox" v-model="purchased" v-on:change="update" />
    <span class="name">{{ item.name }}</span>
    <div>
      <span class="price">{{ parseFloat(item.price) | currency }}</span>
      <div id="edit-container">
        <fa-icon
          id="edit-toggle"
          icon="ellipsis-v"
          v-on:click="toggleMenu" />
        <div id="edit" v-if="isMenuOpen">
          <!-- <div
            v-if="!isEditing"
            v-on:click="isEditing = true"
            class="menu-item edit"><fa-icon icon="edit"/> Edit</div> -->
          <div
            v-on:click="deleteItem(item)"
            class="menu-item delete"><fa-icon icon="trash"/> Delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemService from '../services/itemService';

export default {
  name: "item",
  props: {
    budgetId: Number,
    recipientId: Number,
    item: Object,
    deleteItem: Function
  },
  data: function() {
    let self = this;
    return {
      purchased: self.item.purchased,
      isMenuOpen: false
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
    },
    toggleMenu: function () {
      this.isMenuOpen = !this.isMenuOpen;
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
}
.unpurchased {
  font-style: italic;
  color: #959595;
}
input[type="checkbox"] {
  border:5px solid black;
}
#edit-toggle {
  margin-left: 15px;
  cursor: pointer;
}
#edit-container {
  position: relative;
  display: inline-block;
}
div#edit {
  color: #000;
  position: absolute;
  width: 130px;
  text-align: left;
  background: #fff;
  border: 1px solid #2c3e50;
  padding: 5px;
  z-index: 15;
}
div#edit div {
  margin: 5px 5px 5px 15px;
}
.menu-item {
  cursor: pointer;
}
</style>
