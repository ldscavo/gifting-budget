<template>
    <div id="app">
        <Budget v-bind:budget="budget" />
    </div>
</template>

<script>
import Budget from './components/Budget.vue'
import Recipient from './components/Recipient.vue'
import budgetJson from './json/budget.json'

export default {
    name: 'app',
    components: {
        Budget,
        Recipient
    },
    data: function() {
        return {
            budget: budgetJson 
        }    
    },
    methods: {
        saveBudget: function() {
            var store = window.localStorage;

            store.setItem(budget.name, JSON.stringify(budget));
        }
    }
}
</script>

<style>
html {
    background-color: cadetblue;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 35px;
}
</style>
