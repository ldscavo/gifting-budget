<template>
    <div id="app">
        <Budget v-bind:budget="budgets" />
    </div>
</template>

<script>
import Budget from './components/Budget.vue'
import Recipient from './components/Recipient.vue'
import budgetsJson from './json/budgets.json'

export default {
    name: 'app',
    components: {
        Budget,
        Recipient
    },
    data: function() {
        return {
            budgets: budgetsJson 
        }    
    },
    methods: {
        saveBudget: function() {

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
