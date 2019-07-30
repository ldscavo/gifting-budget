<template>
    <form class="add-entry add-recipient" v-on:submit.prevent="addRecipient">
        <h4>Add a Recipient</h4>
        <div class="add-entry-field">
            <label for="recipient-name">Name:</label>
            <input type="text" v-model="name" id="recipient-name" placeholder="recipient Name" />
        </div>
        <div class="add-entry-field">
            <label for="recipient-price">Amount:</label>
            $<input type="number" v-model="amount" id="recipient-amount" step="0.01" />
        </div>   
        <div class="add-entry-field">
            <button type="submit">Add &raquo;</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "AddRecipient",
    props: {
        recipients: Array
    },
    data: function() {
        return {
            name: "",
            amount: 0.00
        }
    },
    methods: {
        addRecipient(event) {
            var name = this.name
            var amount = this.amount

            if (name != "" && amount > 0) {
                var newRecipient = { name: name, amount: amount, items: [] }
                this.recipients.push(newRecipient)
                this.clearItem()
            } 
        }
    }
}
</script>

<style>
    .add-recipient {
        max-width: 500px;
        padding: 15px;
        margin: 0 auto 100px;
        background: #fefefe;
    }
</style>
