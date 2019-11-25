<template>
    <div class="recipient">
        <div class="showhide" v-on:click="showhide()">
            <span v-if="!collaped">-</span>
            <span v-if="collaped">+</span>
        </div>
        <div class="recipient-details" v-if="!collaped">
            <h3>{{ recipient.name }}</h3>
            <div>
                <div>
                    <div>Budgeted: {{ recipient.amount | currency }}</div>
                    <div>Spent: {{ totalSpent() | currency }}</div>
                    <div>
                        Remaining:
                        <span v-bind:class="{ 'over-budget': remaining() < 0 }">
                            {{ remaining() | currency }}
                        </span>
                    </div>
                </div>
                <div class="items-container" v-if="recipient.items">
                    <item v-for="item in recipient.items"
                        v-bind:key="item.name"
                        v-bind:budgetId="budgetId"
                        v-bind:recipientId="recipient.id"
                        v-bind:item="item" />
                    <div v-if="recipient.items.length == 0">
                        <em>Nothing here yet!</em>
                    </div>
                </div>
                <add-item
                    v-bind:items="recipient.items"
                    v-bind:budgetId="budgetId" 
                    v-bind:recipientId="recipient.id" />
            </div>
        </div>
        <recipient-minimized
            v-if="collaped"
            v-bind:recipient="recipient"
            v-bind:total="totalSpent()" />
    </div>
</template>

<script>
import _ from 'lodash'

import recipientMinimized from './recipientMinimized'
import item from './item'
import addItem from './addItem'

export default {
    name: 'recipient',
    props: {
        recipient: Object,
        budgetId: Number
    },
    components: {
        recipientMinimized,
        item,
        addItem
    },
    data: function(){
        return {
            collaped: true
        }
    },
    methods: {
        totalSpent: function() {
            return _.sumBy(this.recipient.items, item => item.purchased ? parseFloat(item.price) : 0)
        },
        remaining: function() {
            return this.recipient.amount - this.totalSpent();
        },
        showhide() {
            this.collaped = !this.collaped;
        }
    }
}
</script>

<style scoped>
    .recipient {
        display: flex;
        justify-content: flex-start;
        border:1px solid #a2a2a2;
        background-color: #fafafa;
        max-width:690px;
        margin:15px auto;
        padding:15px;
    }
    .recipient-details {
        width: 100%;
    }
    .items-container {
        margin:15px 5px;
    }
    .showhide {
        border-radius:2px;
        text-align: center;
        font-size: 1.2rem;
        height:25px;
        width:25px;
        cursor: pointer;
    }
</style>
