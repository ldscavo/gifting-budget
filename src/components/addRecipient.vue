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
            amount: 0.00
        }
    },
    methods: {
        addRecipient(event) {
            let self = this;

            if (self.name != "" && self.amount > 0) {
                recipientService.createRecipient(self.budgetId, self.name, self.amount)
                    .then(response => {
                        self.recipients.push(response.data.data);
                        self.clear();
                    });
            } 
        },
        clear() {
            this.name = "";
            this.amount = 0.00;
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
