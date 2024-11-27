const PermanentDonation = require('../models/permanentDonationModel');

const PermanentDonationService = {
    async createDonation(donationData) {
        return PermanentDonation.create(donationData);
    },

    async getDonationById(donationId) {
        return PermanentDonation.findById(donationId);
    },

    async getAllDonations() {
        return PermanentDonation.findAll();
    },

    async updateDonation(donationId, donationData) {
        return PermanentDonation.update(donationId, donationData);
    },

    async deleteDonation(donationId) {
        return PermanentDonation.deleteById(donationId);
    }
};

module.exports = PermanentDonationService;
