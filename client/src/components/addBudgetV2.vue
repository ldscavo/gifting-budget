<template>
    <div class="container">
        <div class="box new-budget" v-if="isAdding">
            <form v-on:submit.prevent="addBudget">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="name" placeholder="My Event" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Amount</label>
                    <div class="control">
                        <input class="input" type="number" step="1" v-model="amount" />
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button v-on:click="toggleForm" class="button is-link is-light">
                            Cancel
                        </button>
                    </div>
                    <div class="control">
                        <button class="button is-link">Submit</button>
                    </div>
                </div>
                <beat-loader v-if="loading" color="#973735" />
            </form>
        </div>
        <a v-if="!isAdding" v-on:click="toggleForm">+ Add New Budget</a>
    </div>
</template>

<script>
import budgetService from '../services/budgetService';

export default {
    name: 'addBudgetV2',
    data: function () {
        return {
            isAdding: false,
            name: "",
            amount: 0,
            loading: false
        }
    },
    methods: {
        toggleForm: function () {
            this.isAdding = !this.isAdding;
        },
        addBudget: async function () {
            this.loading = true;

            let response = await budgetService.createBudget(this.name, this.amount);

            this.$router.push({ path: `/budget/${response.data.data.id}` });
        }
    }
}
</script>

<style>
.new-budget {
    max-width: 500px;
    margin: 0 auto;
}
</style>