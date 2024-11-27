const Camp = require('../models/campModel');

const CampService = {
    async createCamp(campData) {
        return Camp.create(campData);
    },

    async getCamps() {
        const camps = await Camp.findAll();
        return camps;
    },

    async getCampById(campId) {
        if (campId) {
            const [camp] = await Camp.findById(campId);
            return camp;
        }
        return Camp.findAll();
    },

    async updateCamp(campId, campData) {
        const result = await Camp.update(campId, campData);
        if (result.affectedRows === 0) throw new Error('Camp not found');
        return result;
    },

    async deleteCamp(campId) {
        const result = await Camp.deleteById(campId);
        if (result.affectedRows === 0) throw new Error('Camp not found');
        return result;
    }
};

module.exports = CampService;
