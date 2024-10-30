<template>
    <table class="table is-fullwidth">
        <tr>
            <th>Name</th>
            <th class="dollars">Budgeted</th>
            <th class="dollars">Remaining</th>
        </tr>
        <recipient-v2 v-for="recipient in recipients" v-bind:key="recipient.name" v-bind:recipient="recipient"
            v-bind:budgetId="budgetId" v-bind:deleteRecipient="deleteRecipient" />
    </table>
</template>

<script>
import recipientV2 from './recipientV2'

export default {
    name: 'recipientsV2',
    props: {
        recipients: Array,
        budgetId: Number,
        deleteRecipient: Function
    },
    components: {
        recipientV2
    }
}
</script>
<style scoped>
.fixed-grid {
    border: 1px solid #bba169;
}

.dollars {
    text-align: right !important;
}
</style>