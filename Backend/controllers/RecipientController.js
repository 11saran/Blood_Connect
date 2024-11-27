const RecipientService = require('../services/recipientService');

const RecipientController = {
    async createRecipient(req, res) {
        try {
            console.log("Received data from controller :", req.body);

            const recipientData = req.body;
            const newRecipientId = await RecipientService.createRecipient(recipientData);
            res.status(201).json({ message: 'Recipient created successfully', recipientId: newRecipientId });
        } catch (err) {
            console.error('Error creating recipient:', err);
            res.status(400).json({ message: err.message });
        }
    },

    async getRecipientById(req, res) {
        try {
            const recipientId = req.params.id;
            const recipient = await RecipientService.getRecipientById(recipientId);
            res.status(200).json(recipient);
        } catch (err) {
            console.error('Error fetching recipient:', err);
            res.status(404).json({ message: err.message });
        }
    },

    async getAllRecipients(req, res) {
        try {
            const recipients = await RecipientService.getAllRecipients();
            res.status(200).json(recipients);
        } catch (err) {
            console.error('Error fetching recipients:', err);
            res.status(500).json({ message: 'Error fetching recipients' });
        }
    },

    async updateRecipient(req, res) {
        try {
            const recipientId = req.params.id;
            const recipientData = req.body;
            await RecipientService.updateRecipient(recipientId, recipientData);
            res.status(200).json({ message: 'Recipient updated successfully' });
        } catch (err) {
            console.error('Error updating recipient:', err);
            res.status(404).json({ message: err.message });
        }
    },

    async deleteRecipient(req, res) {
        try {
            const recipientId = req.params.id;
            await RecipientService.deleteRecipient(recipientId);
            res.status(200).json({ message: 'Recipient deleted successfully' });
        } catch (err) {
            console.error('Error deleting recipient:', err);
            res.status(404).json({ message: err.message });
        }
    }
};

module.exports = RecipientController;
