<template>
    <div class="budget">        
        <BudgetDetails v-bind:budget="budget" />
        <Recipient v-for="recipient in budget.recipients"
            v-bind:key="recipient.name"
            v-bind:recipient="recipient" />
        <AddRecipient v-bind:recipients="budget.recipients" />
    </div>
</template>

<script>
import _ from 'lodash'
import BudgetDetails from './BudgetDetails.vue'
import Recipient from './Recipient.vue'
import AddRecipient from './AddRecipient.vue'

export default {
    name: 'Budget',
    components: {
        BudgetDetails,
        Recipient,
        AddRecipient
    },
    props: {
        budget: Object
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
    padding-top: 25px;
    background-color: #fafafa;  
}
</style>
