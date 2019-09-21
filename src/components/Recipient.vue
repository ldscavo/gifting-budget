<template>
    <div class="recipient">
        <header class="recipient-header">
            <div class="showhide" v-on:click="showhide()">
                <span v-if="!hidden">-</span>
                <span v-if="hidden">+</span>
            </div>
            <div>{{ recipient.name }}</div>
            <div>
                Budgeted: $<input class="edit-field" type="text" pattern="[0-9]*[.,]?[0-9]?[0-9]?" v-model.number="recipient.amount" />
            </div>
            <div>
                Spent: {{ totalSpent() | currency }}
            </div>
            <AddItem v-bind:items="recipient.items" />
        </header>
        <section v-if="!hidden" class="items-container">
            <Item v-for="item in recipient.items"
                v-bind:key="item.name"
                v-bind:item="item" />
            <div v-if="recipient.items.length == 0">
                <em>Nothing here yet!</em>
            </div>
        </section>
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
        border-bottom: 1px solid #a2a2a2;
        /* background-color: #fafafa; */
        /* max-width:690px; */
        /* margin:15px auto; */
        padding:15px;
    }
    .recipient-header {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
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
