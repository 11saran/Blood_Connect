const Recipient = require('../models/recipientModel');

const RecipientService = {
    async createRecipient(recipientData) {
        console.log("Received data from servise  :", recipientData);
        return Recipient.create(recipientData);
    },

    async getRecipientById(recipientId) {
        return Recipient.findById(recipientId);
    },

    async getAllRecipients() {
        return Recipient.findAll();
    },

    async updateRecipient(recipientId, recipientData) {
        return Recipient.update(recipientId, recipientData);
    },

    async deleteRecipient(recipientId) {
        return Recipient.deleteById(recipientId);
    }
};

module.exports = RecipientService;
