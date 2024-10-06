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
                <p>
                    <strong>Amount:</strong>
                    <br />{{ parseFloat(budget.amount) | currency }}
                </p>
                <p>
                    <strong>Last Update:</strong>
                    <br />{{ budget.updated_at | date }}
                </p>
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
</style>