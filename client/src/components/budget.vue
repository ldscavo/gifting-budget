<template>
<div>
  <div id="loading" v-if="loading">
    <clip-loader
      size="80"
      color="#973735" />
  </div>
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
</div>
</template>

<script>
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
    return {
      loading: true,
      budget: null
    }
  },
  mounted: async function() {
    let response = await budgetService.getBudget(this.$route.params.id);
    
    this.budget = response.data.data;
    this.loading = false;
  }
}
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.budget {
  max-width: 960px;
  margin: 0 auto;
}
#loading {
  margin-top: 35px;
}
</style>
