<template>
    <div id="main-header">
        <div id="site-logo">
            <a href="#">Gift Budget</a>            
        </div>
        <div>
            <!--
            <span id="save"><button v-bind:click="saveBudget()">SAVE</button></span>
            <span id="load"><button>LOAD</button></span>
            -->
        </div>        
    </div>
</template>

<script>
export default {
    name: "headerBar",
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
        border-bottom: 1px solid #389da0;
        width:100%;
        height: 75px;
        background-color: #42babd;
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
