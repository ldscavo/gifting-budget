<template>
    <div class="recipient">
        <div class="showhide" v-on:click="showhide()">
            <span v-if="!hidden">-</span>
            <span v-if="hidden">+</span>
        </div>
        <h3>{{ recipient.name }}</h3>
        <div v-if="!hidden">
            <span>Spent: {{ totalSpent() | currency }} out of {{ recipient.amount | currency }}</span>
            <div class="items-container">
                <Item v-for="item in recipient.items"
                    v-bind:key="item.name"
                    v-bind:item="item" />
                <div v-if="recipient.items.length == 0">
                    <em>Nothing here yet!</em>
                </div>
            </div>
            <AddItem v-bind:items="recipient.items" />
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

import Item from './Item.vue'
import AddItem from './AddItem.vue'

export default {
    name: 'Recipient',
    props: {
        recipient: Object
    },
    components: {
        Item, AddItem
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
