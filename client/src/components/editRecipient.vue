<template>
  <div>
    <h3>{{ recipient.name }}</h3>
    <form v-on:submit="onSubmit(name, amount)">
      <div class="form-section">
        <label for="name">Name:</label>
        <input id="name" class="form-input text" v-model="name" />
      </div>
      <div class="add-entry-field">
        <label for="recipient-price">Amount:</label>
        $<input class="form-input" type="number" v-model="amount" id="recipient-amount" step="0.01" />
      </div>   
      <div class="add-entry-field" v-if="!loading">
        <button type="reset" v-on:click="onCancel">Cancel</button>
        <button type="submit">Save Changes</button>
      </div>
      <beat-loader
        v-if="loading"
        color="#973735" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'editRecipient',
  props: {
    recipient: Object,
    onSubmit: Function,
    onCancel: Function
  },
  data() {
    return {
      name: this.recipient.name,
      amount: this.recipient.amount,
      loading: false
    }
  }
}
</script>

<style>

</style>