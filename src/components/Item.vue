<template>
    <div class="item" v-bind:class="{ 'purchased': item.purchased }">
        <input type="checkbox" v-model="item.purchased" />
        {{ item.name }} - {{ item.price | currency }}
    </div>
</template>

<script>
export default {
    name: "Item",
    props: {
        item: Object
    }
}
</script>

<style scoped>
    .item {
        width:80%;
        margin: 0 auto;
        border:1px solid #000;
        padding:5px 10px;
    }
    .purchased {
        background-color: aquamarine;
    }
</style>
