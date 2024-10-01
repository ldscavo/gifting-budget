let knex = require('../db');

module.exports = {
  getItemsByRecipient: async recipientId => 
    await knex('items')
      .where({ recipientId: recipientId }),

  getItemById: async id =>
    await knex('items')
      .where({ id: id })
      .first(),

  addItemToRecipient: async (recipientId, item) => {
    item.recipientId = recipientId;

    let createdItem =
      await knex('items')
        .insert(item)
        .returning('*')
      
    return createdItem[0];
  },

  updateItem: async (id, newItemData) => {
    let updatedItem =
      await knex('items')
        .where({ id: id })
        .update(newItemData)
        .returning('*');

    return updatedItem[0];
  },

  deleteItem: async id => 
    await knex('items')
      .where({ id: id })
      .del()  
}