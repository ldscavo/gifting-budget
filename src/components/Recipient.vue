<template>
    <div class="recipient">
        <div>
            <h5>{{ recipient.name }}</h5>
            <span>Spent: {{ totalSpent() | currency }} out of {{ recipient.amount | currency }}</span>
            <Item v-for="item in recipient.items"
                v-bind:key="item.name"
                v-bind:item="item" />
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

import Item from './Item.vue'

export default {
    name: 'Recipient',
    props: {
        recipient: Object
    },
    components: {
        Item
    },
    methods: {
        totalSpent: function() {
            return _.sumBy(this.recipient.items, item => item.price)
        },
        addItem: function(name, price) {
            var newItem = {
                name: name,
                price: price,
                purchased: true
            }

            this.recipient.items.push(newItem)
        }
    }
}
</script>

<style scoped>
    .recipient {
        border:1px solid #000;
    }
</style>
