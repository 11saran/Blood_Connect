const Disease = require('../models/diseaseModel');

const DiseaseService = {
    async createDisease(diseaseData) {
        return Disease.create(diseaseData);
    },

  
    async getDiseases() {
        const diseases = await Disease.findAll();  
        return diseases;  
    },

    async getDiseasesById(diseaseId) {
        if (diseaseId) {
            const [disease] = await Disease.findById(diseaseId);
            return disease;
        }
        return Disease.findAll();
    },


    async updateDisease(diseaseId, diseaseData) {
        const result = await Disease.update(diseaseId, diseaseData);
        if (result.affectedRows === 0) throw new Error('Disease not found');
        return result;
    },

    async deleteDisease(diseaseId) {
        const result = await Disease.deleteById(diseaseId);
        if (result.affectedRows === 0) throw new Error('Disease not found');
        return result;
    }
};

module.exports = DiseaseService;
