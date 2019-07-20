<template>
    <form v-on:submit.prevent="addItem">
        <div>
            <label for="item-name">Name:</label>
            <input type="text" v-model="name" id="item-name" placeholder="Item Name" />
        </div>
        <div>
            <label for="item-name">Price:</label>
            <input type="number" v-model="price" id="item-price" step="0.01" />
        </div>   
        <div>            
            <input type="submit" value="Add Item" />
        </div>
    </form>
</template>

<script>
export default {
    name: "AddItem",
    props: {
        items: Array
    },
    data: function() {
        return {
            name: "",
            price: 0.00
        }
    },
    methods: {
        addItem: function(event) {
            var name = this.name
            var price = this.price

            var newItem = { name: name, price: price, purchased: true }
            this.items.push(newItem)
        }
    }
}
</script>

<style scoped>

</style>