<template>
    <div class="container">
        <h1 class="title">{{ budget.name }}</h1>
        <div class="fixed-grid has-5-cols">
            <div class="grid is-gap-0">
                <div class="cell"><strong>Budgeted</strong></div>
                <div class="cell is-row-span-2 symbol">-</div>
                <div class="cell"><strong>Spent</strong></div>
                <div class="cell is-row-span-2 symbol">=</div>
                <div class="cell"><strong>Remaining</strong></div>
                <div class="cell">{{ totalAllocated() | currency }}</div>
                <div class="cell">{{ totalSpent() | currency }}</div>
                <div class="cell" v-bind:class="{ 'over-budget': remainingBalance() < 0 }">
                    {{ remainingBalance() | currency }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: "budgetDetailsV2",
    props: {
        budget: Object
    },
    methods: {
        totalAllocated: function () {
            return _.sumBy(this.budget.recipients, recipient =>
                recipient.amount !== '' ? parseFloat(recipient.amount) : 0)
        },
        totalSpent: function () {
            return _.sumBy(this.budget.recipients,
                recipient => _.sumBy(recipient.items,
                    item => item.purchased ? parseFloat(item.price) : 0))
        },
        remainingBalance: function () {
            return this.totalAllocated() - this.totalSpent()
        }
    }
}
</script>

<style>
.container {
    width: 350px;
}

.symbol {
    font-size: larger;
    vertical-align: middle;
    padding: 1px;
}
</style>