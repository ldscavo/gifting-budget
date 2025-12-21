<template>
    <div class="container">
        <div class="box new-budget" v-if="isAdding">
            <form v-on:submit.prevent="addBudget">
                <h1 class="title is-6">New Budget</h1>
                <div class="field">
                    <label class="label">Name:</label>
                    <div class="control">
                        <input class="input" type="text" v-model="name" placeholder="My Event" />
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
            loading: false
        }
    },
    methods: {
        toggleForm: function () {
            this.isAdding = !this.isAdding;
        },
        addBudget: async function () {
            this.loading = true;

            let response = await budgetService.createBudget(this.name);

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
.label {
    text-align: left;
}
</style>
