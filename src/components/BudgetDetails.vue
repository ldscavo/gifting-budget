<template>
    <div class="budget-details">
        <!-- <h1>{{ budget.name }}</h1> -->
        <section class="totals">
            <div class="totals-left">
                <div class="total amount">
                    <span>Budgeted</span><span class="total-money">{{ totalAmount() | currency }}</span>
                </div>
                <div class="total spent">
                    <span>Spent</span><span class="total-money">{{ totalSpent() | currency }}</span>
                </div>
            </div>
            <div class="total totals-main" v-bind:class="{ 'over-budget': remainingBalance() < 0 }">
                <span>Remaining</span><span class="total-money">{{ remainingBalance() | currency }}</span>
            </div>
        </section>   
    </div>
</template>

<script>
export default {
    name: "BudgetDetails",
    props: {
        budget: Object
    },
    methods: {
        totalAmount: function() {
            return _.sumBy(this.budget.recipients, recipient => recipient.amount !== '' ? recipient.amount : 0)
        },
        totalSpent: function() {
            return _.sumBy(this.budget.recipients, recipient => _.sumBy(recipient.items, item => item.purchased ? item.price : 0))
        },
        remainingBalance: function() {
            return this.totalAmount() - this.totalSpent()
        }
    }
}
</script>

<style scoped>
.budget-details {
    color: white;
    /* border:1px solid #a2a2a2; */
    /* border-top: none; */
    /*box-shadow: 1px 2px #888;*/
    /* background-color: #fafafa; */
    padding:15px 5px;
}
.over-budget {
    color:red;
    font-weight: bold;
}
.totals {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.total {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    color: #d2e3f3;
}
.totals-left {
    flex: 1 1 50%;
    border-right: 1px solid #d2e3f3;
    padding-right: 1rem;
    display: flex;
    flex-flow: row wrap;
}
.totals-left > .total {
    margin: 0.25rem 1rem 0.25rem 0;
}
.totals-main {
    flex: 1 1 50%;
    align-self: center;
    margin-left: 1rem;
}
.totals-main > .total-money {
    font-size: 2rem;
}
.total-money {
    font-weight: bold;
    font-size: 1.5rem;
    color: #fff;
}
</style>
