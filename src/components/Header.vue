<template>
    <div id="main-header">
        <div id="site-logo">
            <a href="#">Gift Budget</a>            
        </div>
        <div>
            <span id="save"><button v-bind:click="saveBudget()">SAVE</button></span>
            <span id="load"><button>LOAD</button></span>
        </div>        
    </div>
</template>

<script>
export default {
    name: "Header",
    props: {
        budget: Object
    },
    methods: {
        saveBudget: function() {
            var store = window.localStorage;

            store.setItem(this.budget.name, JSON.stringify(this.budget));
        }
    }
}
</script>

<style>
    #main-header {
        width:100%;
        height: 75px;
        background-color: #5f7ea0;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    #main-header div span {        
        padding:5px;
    }
    #site-logo {
        font-size: 2rem;
        margin-left:50px;
    }
    #site-logo a {
        font-weight: bold;
        text-decoration: none;
        color: #fff;
        text-shadow: 1px 1px #2c3e50;
    }
</style>
