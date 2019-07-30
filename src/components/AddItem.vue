<template>
    <div>
        <form class="add-entry" v-on:submit.prevent="addItem" v-if="isAdding">
            <div class="add-entry-field">
                <label for="item-name">Name:</label>
                <input type="text" v-model="name" id="item-name" placeholder="Item Name" />
            </div>
            <div class="add-entry-field">
                <label for="item-price">Price:</label>
                $<input type="number" v-model="price" id="item-price" step="0.01" />
            </div>   
            <div class="add-entry-field">
                <button type="submit">Add &raquo;</button>
            </div>
        </form>    
        <button v-if="!isAdding" v-on:click="openForm()">+ Add Item</button>
    </div>
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
            price: 0.00,
            isAdding: false
        }
    },
    methods: {
        addItem: function(event) {
            var self = this;
            
            if (name != "" && price > 0) {
                var newItem = { name: self.name, price: Number.parseFloat(self.price), purchased: true }
                this.items.push(newItem)
                this.clearItem()
            }            
        },
        clearItem: function() {
            this.name = ""
            this.price = 0.00
        },
        openForm: function() {
            this.isAdding = true
        }
    }
}
</script>

<style scoped>

</style>