const PermanentDonationService = require('../services/permanentDonationService');

const PermanentDonationController = {
    async createDonation(req, res) {
        try {
            const donationData = req.body;
            const newDonationId = await PermanentDonationService.createDonation(donationData);
            res.status(200).json({ message: 'Donation record created successfully', donationId: newDonationId });
        } catch (err) {
            console.error('Error creating donation record:', err);
            res.status(400).json({ message: err.message });
        }
    },

    async getDonationById(req, res) {
        try {
            const donationId = req.params.id;
            const donation = await PermanentDonationService.getDonationById(donationId);
            res.status(200).json(donation);
        } catch (err) {
            console.error('Error fetching donation record:', err);
            res.status(404).json({ message: err.message });
        }
    },

    async getAllDonations(req, res) {
        try {
            const donations = await PermanentDonationService.getAllDonations();
            res.status(200).json(donations);
        } catch (err) {
            console.error('Error fetching donations:', err);
            res.status(500).json({ message: 'Error fetching donations' });
        }
    },

    async updateDonation(req, res) {
        try {
            const donationId = req.params.id;
            const donationData = req.body;
            await PermanentDonationService.updateDonation(donationId, donationData);
            res.status(200).json({ message: 'Donation record updated successfully' });
        } catch (err) {
            console.error('Error updating donation record:', err);
            res.status(404).json({ message: err.message });
        }
    },

    async deleteDonation(req, res) {
        try {
            const donationId = req.params.id;
            await PermanentDonationService.deleteDonation(donationId);
            res.status(200).json({ message: 'Donation record deleted successfully' });
        } catch (err) {
            console.error('Error deleting donation record:', err);
            res.status(404).json({ message: err.message });
        }
    },
};

module.exports = PermanentDonationController;
