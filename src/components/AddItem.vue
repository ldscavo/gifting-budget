<template>
    <form class="add-item" v-on:submit.prevent="addItem">
        <div class="add-item-field">
            <label for="item-name">Name:</label>
            <input type="text" v-model="name" id="item-name" placeholder="Item Name" />
        </div>
        <div class="add-item-field">
            <label for="item-price">Price:</label>
            $<input type="number" v-model="price" id="item-price" step="0.01" />
        </div>   
        <div class="add-item-field">
            <button type="submit">Add &raquo;</button>
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
            var price = Number.parseFloat(this.price)
            
            if (name != "" && price > 0) {
                var newItem = { name: name, price: price, purchased: true }
                this.items.push(newItem)
                this.clearItem()
            }            
        },
        clearItem: function() {
            this.name = ""
            this.price = 0.00
        }
    }
}
</script>

<style scoped>
.add-item {
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /*border:1px solid #000;*/
}
.add-item-field {
    padding:5px;
    /*border:1px solid #000;*/
}
.add-item-field label {
    display: block;
}
</style>