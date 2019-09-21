<template>
    <header id="main-header">
        <section class="logo-row">
            <div id="site-logo">
                <a href="#">{{ budget.name }}</a>            
            </div>
            <div>
                <span id="save"><button v-bind:click="saveBudget()">SAVE</button></span>
                <span id="load"><button>LOAD</button></span>
            </div>  
        </section>
        <section class="budget-summary">
            <BudgetDetails v-bind:budget="budget" />
        </section>    
    </header>
</template>

<script>
import BudgetDetails from './BudgetDetails.vue';
export default {
    name: "Header",
    props: {
        budget: Object
    },
    components: {
        BudgetDetails
    },
    methods: {
        saveBudget: function() {
            var store = window.localStorage;

            store.setItem(this.budget.name, JSON.stringify(this.budget));
        }
    }
}
</script>

<style scoped>
    /* #main-header {
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
    } */
    #site-logo {
        font-size: 2rem;
    }
    #site-logo a {
        font-weight: bold;
        text-decoration: none;
        color: #fff;
        text-shadow: 1px 1px #2c3e50;
    }
    header {
        position: relative;
        background-image: linear-gradient(#42babd, #4282bd);
        border-bottom-left-radius: 40% 10%;
        border-bottom-right-radius: 40% 10%;
        padding: 1rem 1rem 2rem 1rem;
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-bottom: 2rem;
    }
    header > section {
        max-width: 960px;
    }
    h1 {
        margin: 0;
        padding: 100px 0;
        font: 44px "Arial";
        text-align: center;
    }

    header h1 {
        color: white;
    }
    .logo-row {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .budget-summary {
        width: 100%;
    }
</style>
