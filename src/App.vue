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
    background-color: #fff ;
    width:100%;
}
body {
    padding:0;
    margin:0;
}
button {
    padding:5px 15px;
    color:#fafafa;
    border: none;
    border-bottom:2px solid #114e86;
    border-radius: 1rem;
    background-color: #1e75c7;
}
button:hover {
    background-color: #175c9c;
    border-bottom:2px solid #114e86;
    cursor: pointer;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.add-entry {
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /*border:1px solid #000;*/
}
.add-entry-field {
    padding:5px;
    /*border:1px solid #000;*/
}
.add-entry-field label {
    display: block;
}
input.edit-field {    
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size:1rem;
    border:none;
    max-width: 125px;
    /*padding:5px none 5px 5px;*/
}
input.edit-field:hover {
    border:1px solid #a2a2a2;
}
input.edit-field:focus {
    border:1px solid #2c3e50;
}
</style>
