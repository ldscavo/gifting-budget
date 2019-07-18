<template>
    <div class="budget">
        <h1>{{ budget.name }}</h1>
        <div class="budget-details">
            <div class="amount">Total Amount Budgeted: {{ totalAmount() | currency }}</div>
            <div class="spent">Total Spent: {{ totalSpent() | currency }}</div>
            <div class="remaining">Remaining: {{ totalAmount() - totalSpent() | currency }}</div>
        

            <Recipient v-for="recipient in budget.recipients"
                v-bind:key="recipient.name"
                v-bind:recipient="recipient" />   
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import Recipient from './Recipient.vue'

export default {
    name: 'Budget',
    components: {
        Recipient
    },
    props: {
        budget: Object
    },
    methods: {
        totalAmount: function() {
            return _.sumBy(this.budget.recipients, recipient => recipient.amount)
        },
        totalSpent: function() {
            return _.sumBy(this.budget.recipients, recipient => _.sumBy(recipient.items, item => item.price))
        }
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
    max-width: 690px;
    margin:0 auto;
}
.budget-details {
    background-color: #fff;
    padding-top: 25px;
}
</style>
