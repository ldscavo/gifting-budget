<template>
<div>
  <div v-if="!isEditing" class="item" v-bind:class="{ 'unpurchased': !purchased }">
    <input type="checkbox" v-model="purchased" v-on:change="togglePurchase" />
    <span class="name">{{ item.name }}</span>
    <div>
      <span class="price">{{ parseFloat(item.price) | currency }}</span>
      <div id="edit-container">        
        <fa-icon icon="edit" v-on:click="toggleEdit" class="menu-item"/>
        <fa-icon icon="trash" v-on:click="deleteItem(item)" class="menu-item" />
      </div>
    </div>
  </div>
  <form v-on:submit.prevent="update" v-if="isEditing" class="item">
    <div>&nbsp;</div>
    <input class="edit-input" v-model="editedName" type="text"/>
    
    <div>
      <input class="edit-input" v-model="editedPrice" type="number"/>
      <fa-icon icon="check" class="menu-item" v-on:click="update" />
      <fa-icon icon="ban" class="menu-item" v-on:click="toggleEdit" />
      <input type="submit" style="display: none" />
    </div>  
  </form> 
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
      isMenuOpen: false,
      isEditing: false,
      editedName: self.item.name,
      editedPrice: self.item.price
    }
  },
  methods: {
    togglePurchase: async function() {
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
    update: async function() {      
      await itemService.updateItem(
        this.budgetId,
        this.recipientId,
        this.item.id,
        this.editedName,
        this.editedPrice,
        this.purchased);

      this.item.name = this.editedName;
      this.item.price = this.editedPrice;
      this.isEditing = false;      
    },
    toggleMenu: function () {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleEdit: function () {
      this.isEditing = !this.isEditing;
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
  margin-left: 15px;
  cursor: pointer;
  /* font-size: 0.9rem; */
}
.edit-input {
  font-size: 0.9rem;
  padding: 5px 5px;
}
@media only screen and (max-width: 550px) {
  .item {
    padding:7.5px;
  }
  .menu-item {
    font-size: 0.9rem;
    margin-left: 10px;
  }
}
</style>
