<template>
    <fragment>
        <tr>
            <td class="recipient-name">
                <span class="icon-text">
                    <span class="icon" v-on:click="showhide()">
                        <i v-if="!collapsed" class="fas fa-chevron-down chevron"></i>
                        <i v-if="collapsed" class="fas fa-chevron-right chevron"></i>
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
        <tr class="item-list" v-if="!collapsed">
            <td class="item-list" colspan="3">
                <table class="table is-borderedd is-fullwidth item-list">
                    <tr>
                        <td>
                            <input type="checkbox" checked />
                        </td>
                        <td>A Whole Pizza</td>
                        <td>$5.99</td>
                        <td>
                            <span v-if="!isEditing" v-on:click="isEditing = true" class="toolbar-item edit"><fa-icon
                                    icon="edit" /></span>
                            <span v-on:click="deleteRecipient(recipient)" class="toolbar-item remove"><fa-icon
                                    icon="trash" /></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" checked />
                        </td>
                        <td>A Whole Pizza</td>
                        <td>$5.99</td>
                        <td>
                            <span v-if="!isEditing" v-on:click="isEditing = true" class="toolbar-item edit"><fa-icon
                                    icon="edit" /></span>
                            <span v-on:click="deleteRecipient(recipient)" class="toolbar-item remove"><fa-icon
                                    icon="trash" /></span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Total:</th>
                        <td>$500.00</td>
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
}
.toolbar-item {
    text-align: center;
    cursor: pointer;
    padding: 5px;
}
</style>