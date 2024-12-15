<template>
    <fragment>
        <tr>
            <td class="recipient-name">
                <span class="icon-text">
                    <span class="icon" v-on:click="showhide()">
                        <span v-if="!collapsed"><fa-icon icon="chevron-down"/></span>
                        <span v-if="collapsed"><fa-icon icon="chevron-right"/></span>
                    </span>
                    <span>{{ recipient.name }}</span>
                </span>
            </td>
            <td class="dollars">
                {{ recipient.amount | currency }}
            </td>
            <td class="dollars">
                <span v-bind:class="{ 'over-budget': remaining(recipient) < 0 }">
                    {{ remaining(recipient) | currency }}
                </span>
            </td>
        </tr>
        <tr v-if="!collapsed">
            <td colspan="3">
                <table class="table is-fullwidth item-list">
                    <item-v2
                        v-for="item in recipient.items"
                        v-bind:key="item.id"
                        v-bind:budgetid="budgetId"
                        v-bind:recipientId="recipient.id"
                        v-bind:item="item" />
                    <tr>
                        <th colspan="2"></th>
                        <td class="dollars"><strong>{{ totalSpent() }}</strong></td>
                    </tr>
                </table>
            </td>
        </tr>
    </fragment>

</template>

<script>
import _ from 'lodash'

import recipientDetails from './recipientDetails.vue'
import recipientMinimized from './recipientMinimized.vue'
import item from './item.vue'
import itemV2 from './itemV2.vue'
import addItem from './addItem.vue'
import editRecipient from './editRecipient.vue'

import recipientService from '../services/recipientService'

export default {
    name: 'recipientV2',
    props: {
        recipient: Object,
        budgetId: Number,
        deleteRecipient: Function
    },
    components: {
        recipientDetails,
        recipientMinimized,
        item,
        itemV2,
        addItem,
        editRecipient
    },
    data: function () {
        return {
            collapsed: true,
            isEditing: false
        }
    },
    methods: {
        totalSpent: function () {
            return _.sumBy(this.recipient.items, item => item.purchased ? parseFloat(item.price) : 0)
        },
        remaining: function () {
            return this.recipient.amount - this.totalSpent();
        },
        showhide: function () {
            this.collapsed = !this.collapsed;
        },
        saveRecipient: async function (name, amount) {
            try {
                await recipientService.editRecipient(this.budgetId, this.recipient.id, name, amount);

                this.recipient.name = name;
                this.recipient.amount = amount;
                this.isEditing = false;
                this.collapsed = false;
            }
            catch (err) {
                console.log("Failed to save recipient details!");
            }
        },
        cancel: function () {
            this.isEditing = false;
        }
    }
}
</script>

<style>
.chevron {
    cursor: pointer;
}
.recipient-name {
    text-align: left !important;
}
td.dollars {
    text-align: right !important;
}
.item-list {
    margin-top: 0px;
    border: 1px solid #000;
}
.toolbar-item {
    text-align: center;
    cursor: pointer;
    padding: 5px;
}
</style>
