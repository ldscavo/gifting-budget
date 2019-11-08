<template>
    <div class="recipient">
        <div class="showhide" v-on:click="showhide()">
            <span v-if="!hidden">-</span>
            <span v-if="hidden">+</span>
        </div>
        <h3>{{ recipient.name }}</h3>
        <div v-if="!hidden">
            <span>
                Spent: {{ totalSpent() | currency }} out of
                $<input class="edit-field" type="text" pattern="[0-9]*[.,]?[0-9]?[0-9]?" v-model.number="recipient.amount" />
            </span>
            <div class="items-container" v-if="recipient.items">
                <item v-for="item in recipient.items"
                    v-bind:key="item.name"
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
</template>

<script>
import _ from 'lodash'

import item from './item'
import addItem from './addItem'

export default {
    name: 'recipient',
    props: {
        recipient: Object,
        budgetId: Number
    },
    components: {
        item,
        addItem
    },
    data: function(){
        return {
            hidden: false
        }
    },
    methods: {
        totalSpent: function() {
            return _.sumBy(this.recipient.items, item => item.purchased ? item.price : 0)
        },
        showhide() {
            this.hidden = !this.hidden;
        }
    }
}
</script>

<style scoped>
    .recipient {
        border:1px solid #a2a2a2;
        background-color: #fafafa;
        max-width:690px;
        margin:15px auto;
        padding:15px;
    }
    .items-container {
        margin:15px 5px;
    }
    .showhide {
        border-radius:2px;
        text-align: center;
        height:15px;
        width:15px;
        cursor: pointer;
    }
</style>
