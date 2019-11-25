<template>
    <div>
        <form class="add-entry" v-on:submit.prevent="addItem" v-if="isAdding">
            <div class="add-entry-field">
                <label for="item-name">Name:</label>
                <input class="form-input" type="text" v-model="name" id="item-name" placeholder="Item Name" />
            </div>
            <div class="add-entry-field">
                <label for="item-price">Price:</label>
                $<input class="form-input" type="number" v-model="price" id="item-price" step="0.01" />
            </div>   
            <div class="add-entry-field">
                <button type="reset" v-on:click="toggleForm">Cancel</button>
                <button type="submit">Add Item &raquo;</button>
            </div>
        </form>    
        <a v-if="!isAdding" v-on:click="toggleForm">+ Add Item</a>
    </div>
</template>

<script>
import itemService from '../services/itemService';

export default {
    name: "addItem",
    props: {
        items: Array,
        budgetId: Number,
        recipientId: Number
    },
    data: function() {
        return {
            name: "",
            price: 0.00,
            isAdding: false
        }
    },
    methods: {
        addItem(event) {
            let self = this;

            if (self.name != "" && self.price > 0) {
                itemService.createItem(self.budgetId, self.recipientId, self.name, self.price)
                    .then(response => {
                        self.items.push(response.data.data);
                        self.clear();
                    });
            } 
        },
        clear() {
            this.name = "";
            this.price = 0.00;
        },
        toggleForm: function() {
            this.isAdding = !this.isAdding;
        }
    }
}
</script>