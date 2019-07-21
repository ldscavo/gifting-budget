<template>
    <div id="app">
        <Header v-bind:budget="budget" />
        <Budget v-bind:budget="budget" />
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Budget from './components/Budget.vue'
import Recipient from './components/Recipient.vue'
import budgetJson from './json/budget.json'

export default {
    name: 'app',
    components: {
        Header, 
        Budget,
        Recipient
    },
    data: function() {
        return {
            budget: budgetJson 
        }    
    }
}
</script>

<style>
html {
    background-color: cadetblue;
    width:100%;
}
body {
    padding:0;
    margin:0;
}
button {
    padding:5px 15px;
    border:1px solid #000;
    border-radius: 0.25rem;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
