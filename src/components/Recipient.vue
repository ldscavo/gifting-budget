<template>
    <div class="recipient">
        <div>
            <h3>{{ recipient.name }}</h3>
            <span>Spent: {{ totalSpent() | currency }} out of {{ recipient.amount | currency }}</span>
            <Item v-for="item in recipient.items"
                v-bind:key="item.name"
                v-bind:item="item" />
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
    methods: {
        totalSpent: function() {
            return _.sumBy(this.recipient.items, item => item.price)
        }        
    }
}
</script>

<style scoped>
    .recipient {
        border:1px solid #000;
        margin:15px;
        padding:5px;
    }
</style>
