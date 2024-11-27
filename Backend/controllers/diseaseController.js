const DiseaseService = require('../services/diseaseService');

const DiseaseController = {
    async createDisease(req, res) {
        try {
            const diseaseData = req.body;

            console.log('Received data:', req.body);
            console.log('Uploaded file:', req.file);


            const imagePath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null; 

            const newDiseaseData = {
                ...diseaseData,
                image: imagePath, 
            };

            await DiseaseService.createDisease(newDiseaseData);
            console.log(newDiseaseData);
            res.status(201).json({ message: 'Disease created successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    async getDiseasesById(req, res) {
        try {
            const diseaseId = req.params.id;
            const diseases = await DiseaseService.getDiseases(diseaseId);
            res.status(200).json(diseases);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching diseases' });
        }
    },

    async getDiseases(req, res) {
        try {
            console.log('Request received for fetching diseases'); 
            const diseases = await DiseaseService.getDiseases();
            console.log('Diseases fetched from service:', diseases); 


            if (!diseases || diseases.length === 0) {
                console.warn('No diseases found'); 
            }
    
            res.status(200).json(diseases);
        } catch (err) {
            console.error('Error fetching diseases:', err); 
            res.status(500).json({ message: 'Error fetching diseases' });
        }
    },
    

    async updateDisease(req, res) {
        try {
            const diseaseId = req.params.id;
            const diseaseData = req.body; 
            await DiseaseService.updateDisease(diseaseId, diseaseData);
            res.status(200).json({ message: 'Disease updated successfully' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },

    async deleteDisease(req, res) {
        try {
            const diseaseId = req.params.id;
            await DiseaseService.deleteDisease(diseaseId);
            res.status(200).json({ message: 'Disease deleted successfully' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
};



module.exports = DiseaseController;
