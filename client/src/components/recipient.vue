<template>
  <div class="recipient">
    <div class="recipient-toolbar">
      <div class="toolbar-item" v-on:click="showhide()">
        <span v-if="!collaped"><fa-icon icon="chevron-down"/></span>
        <span v-if="collaped"><fa-icon icon="chevron-right"/></span>
      </div>
      <div class="toolbar-crud">
        <div
          v-if="!isEditing"
          v-on:click="isEditing = true"
          class="toolbar-item edit"><fa-icon icon="edit"/></div>
        <div
          v-on:click="deleteRecipient(recipient)"
          class="toolbar-item remove"><fa-icon icon="trash"/></div>
        </div>      
    </div>
    <div v-if="!isEditing">
      <recipient-details
        v-if="!collaped"
        v-bind:recipient="recipient"
        v-bind:budgetId="budgetId"
        v-bind:total="totalSpent()"
        v-bind:remaining="remaining()" />
      <recipient-minimized
        v-if="collaped"
        v-bind:recipient="recipient"
        v-bind:total="totalSpent()"
        v-bind:showHide="showhide" />
    </div>
    <edit-recipient
      v-if="isEditing"
      v-bind:recipient="recipient"
      v-bind:onSubmit="saveRecipient"
      v-bind:onCancel="cancel" />
  </div>
</template>

<script>
import _ from 'lodash'

import recipientDetails from './recipientDetails'
import recipientMinimized from './recipientMinimized'
import item from './item'
import addItem from './addItem'
import editRecipient from './editRecipient'

import recipientService from '../services/recipientService'

export default {
  name: 'recipient',
  props: {
    recipient: Object,
    budgetId: Number,
    deleteRecipient: Function
  },
  components: {
    recipientDetails,
    recipientMinimized,
    item,
    addItem,
    editRecipient
  },
  data: function(){
    return {
      collaped: true,
      isEditing: false
    }
  },
  methods: {
    totalSpent: function() {
      return _.sumBy(this.recipient.items, item => item.purchased ? parseFloat(item.price) : 0)
    },
    remaining: function() {
      return this.recipient.amount - this.totalSpent();
    },
    showhide: function() {
      this.collaped = !this.collaped;
    },
    saveRecipient: async function(name, amount) {
      try {
        await recipientService.editRecipient(this.budgetId, this.recipient.id, name, amount);

        this.recipient.name = name;
        this.recipient.amount = amount;
        this.isEditing = false;
        this.collaped = false;
      }
      catch (err) {
        console.log("Failed to save recipient details!");
      }
    },
    cancel: function() {
      this.isEditing = false;
    }
  }
}
</script>

<style scoped>
.recipient {
  border: 1px solid #a2a2a2;
  max-width: 820px;
  margin: -1px auto;
  padding-bottom: 10px;
}
.recipient-toolbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height:25px;
  border-bottom: lawngreen;
}
.recipient-toolbar .toolbar-item {
  text-align: center;
  cursor: pointer;
  padding:5px;
}
.recipient-toolbar .toolbar-crud {
  display: flex;
}
a:hover {
  border-bottom: none;
}
</style>