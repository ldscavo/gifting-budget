<template>
  <div class="container">
    <form class="add-entry add-recipient" v-if="isAdding" v-on:submit.prevent="addRecipient">
      <div class="add-entry-field">
        <label for="recipient-name">Name:</label>
        <input class="form-input" type="text" v-model="name" id="recipient-name" placeholder="Recipient Name" />
      </div>
      <div class="add-entry-field">
        <label for="recipient-price">Amount:</label>
        $<input class="form-input" type="number" v-model="amount" id="recipient-amount" step="0.01" />
      </div>   
      <div class="add-entry-field" v-if="!loading">
        <button type="reset" v-on:click="toggleForm">Cancel</button>
        <button type="submit">Add Recipient &raquo;</button>
      </div>
      <beat-loader
        v-if="loading"
        color="#973735" />
    </form>
    <a v-if="!isAdding" v-on:click="toggleForm">+ Add New Recipient</a>
  </div>
</template>

<script>
import recipientService from '../services/recipientService';

export default {
  name: "addRecipient",
  props: {
    recipients: Array,
    budgetId: Number
  },
  data: function() {
    return {
      name: "",
      amount: 0.00,
      isAdding: false,
      loading: false
    }
  },
  methods: {
    addRecipient: async function() {
      if (this.name != "" && this.amount > 0) {
        this.loading = true;

        let response = await recipientService.createRecipient(this.budgetId, this.name, this.amount);

        this.recipients.push(response.data.data);
        this.clear();
      } 
    },

    clear: function() {
      this.name = "";
      this.amount = 0.00;
      this.loading = false;
    },

    toggleForm: function() {
      this.isAdding = !this.isAdding;
    }
  }
}
</script>

<style>
.container {
  margin:15px auto;
}
.add-recipient {
  max-width: 500px;
  padding: 15px;
  margin: 0 auto 100px;
  background: #fefefe;
}
</style>
