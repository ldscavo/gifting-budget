<template>
    <div class="card cell budget-card">
        <header class="card-header">
            <p class="card-header-title">{{ budget.name }}</p>
            <!-- <button class="card-header-icon">
                <span class="icon">
                    <fa-icon icon="edit" />
                </span>
            </button> -->
            <!-- <button class="card-header-icon">
                <span class="icon">
                    <fa-icon icon="trash" />
                </span>
            </button> -->
        </header>
        <div class="card-content">
            <div class="content">
                <div>
                    <strong>Budgeted</strong>
                    <br />{{ parseFloat(budget.amount) | currency }}
                </div>
                <!-- <div> -->
                <!--     <strong>Spent:</strong> -->
                <!--     <br />{{ parseFloat(budget.spent) | currency }} -->
                <!-- </div> -->
                <!-- <div> -->
                <!--     <strong>Remaining</strong> -->
                <!--     <br /> -->
                <!--     <span v-bind:class="{ 'over-budget': remainingBalance(budget) < 0 }"> -->
                <!--         {{ remainingBalance(budget) | currency }} -->
                <!--     </span > -->
                <!-- </div> -->
                <div>
                    <strong>Last Updated</strong>
                    <br />{{ budget.updated_at | date }}
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <router-link
                class="card-footer-item"
                v-bind:to="{ name: 'budget', params: { id: budget.id } }">Open</router-link>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'budgetCardV2',
    props: {
        budget: Object
    },
    methods: {
        remainingBalance: function(budget){
            return budget.amount - budget.spent;
        }
    }
}
</script>

<style>
/* .budget-card {
    max-width: 300px;
} */
 .card {
     height: 100%;
 }
.content {
    font-size: 0.9rem;
    text-align: left;
}
.content div {
    margin-bottom: 10px;
}
</style>
