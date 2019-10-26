<template>
    <router-link v-bind:to="{ name: 'budget', params: {id: budget.id }}">
        <div class="budget-card"><span>{{ budget.name }}</span></div>
    </router-link>
</template>

<script>
export default {
    name: 'budgetCard',
    props: {
        budget: Object
    }
}
</script>

<style scoped>
    a {
        color: #2c3e50;        
        text-decoration: none;
    }
    a:hover {
        border:none;
    }
    .budget-card {
        border:4px solid #a2a2a2;
        border-radius: 10px;
        width:300px;
        height:75px;
        margin:15px;
        display:flex;
    }    
    .budget-card:hover {        
        background:#a2a2a2;
    }
    .budget-card span {
        margin:auto;
        font-size: 1.2rem;
        font-weight: bold;
    }
    .budget-card:hover span {        
        color:#fff;
    }
</style>