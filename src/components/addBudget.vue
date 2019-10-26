<template>
    <div class="container">        
        <form class="add-entry" v-if="isAdding" v-on:submit.prevent="addBudget">
            <div class="add-entry-field">
                <label for="name">Budget Name:</label>
                <input type="text" v-model="name" id="name" placeholder="My Event" />
            </div>
            <div class="add-entry-field">
                <label for="amount">Budget Name:</label>
                <input type="number" step="1" v-model="amount" id="amount" />
            </div>
            <div class="add-entry-field">
                <button type="submit">Create Budget &raquo;</button>
                <button v-on:click="toggleForm" type="reset">Cancel</button>
            </div>
        </form>
        <a v-if="!isAdding" v-on:click="toggleForm">Add New Budget +</a>
    </div>
</template>

<script>
import budgetService from '../services/budgetService';

export default {
    name: 'addBudget',
    data: function() {
        return {
            isAdding: false,
            name: "",
            amount: 0
        }
    },
    methods: {
        toggleForm: function() {
            this.isAdding = !this.isAdding;
        },
        addBudget: function() {
            let self = this;

            budgetService.createBudget(self.name, self.amount)
                .then(response => {
                    self.$router.push({ path: `/budget/${response.data.data.id}`});
                });
        }
    }
}
</script>

<style scoped>
    .add-entry {
        margin: 0 auto;
        max-width: 700px;
        padding:30px 15px;
        border:1px solid #a2a2a2;
        background-color: #fafafa;
    }
    a:hover {
        cursor: pointer;
    }
</style>