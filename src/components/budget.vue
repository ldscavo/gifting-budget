<template>
<div>
    <div class="budget" v-if="budget !== null">        
        <budget-details v-bind:budget="budget" />
        <recipient
            v-for="recipient in budget.recipients"
            v-bind:key="recipient.name"
            v-bind:recipient="recipient"
            v-bind:budgetId="budget.id" />
        <add-recipient
            v-bind:recipients="budget.recipients"
            v-bind:budgetId="budget.id" />
    </div>
    <img src="../assets/loading.gif" v-if="budget === null" />
    </div>
</template>

<script>
import _ from 'lodash'
import budgetDetails from './budgetDetails'
import recipient from './recipient'
import addRecipient from './addRecipient'
import budgetService from '../services/budgetService'

export default {
    name: 'budget',
    components: {
        budgetDetails,
        recipient,
        addRecipient
    },
    props: {
        id: Number
    },
    data: function () { 
        return { budget: null }
    },
    mounted: function() {
        var self = this;

        budgetService.getBudget(self.$route.params.id)
            .then(response => {
                self.budget = response.data.data;
            });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: #2c3e50;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    /*display: inline-block;*/
    margin: 0 10px;
}
a {
    color: #42b983;
}
.budget {
    max-width: 960px;
    margin:0 auto;
    /*padding-top: 25px;*/
    /*background-color: #fafafa;*/
}
</style>
