const CampService = require('../services/campService');

const CampController = {
    async createCamp(req, res) {
        console.log(req.body)
        try {
            const campData = req.body;
            console.log('Received data:', req.body);
            console.log('Uploaded file:', req.file);

            const imagePath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null; 

            const newCampData = {
                ...campData,
                image: imagePath,
            };

            await CampService.createCamp(newCampData);
            console.log(newCampData);
            res.status(201).json({ message: 'Camp created successfully' });
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: err.message });
        }
    },

    async getCampById(req, res) {
        try {
            const campId = req.params.id;
            const camp = await CampService.getCampById(campId);
            res.status(200).json(camp);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching camp' });
        }
    },

    async getCamps(req, res) {
        try {
            console.log('Request received for fetching camps');
            const camps = await CampService.getCamps();
            console.log('Camps fetched from service:', camps);

            if (!camps || camps.length === 0) {
                console.warn('No camps found');
            }

            res.status(200).json(camps);
        } catch (err) {
            console.error('Error fetching camps:', err);
            res.status(500).json({ message: 'Error fetching camps' });
        }
    },

    async updateCamp(req, res) {
        try {
            const campId = req.params.id;
            const campData = req.body;
            await CampService.updateCamp(campId, campData);
            res.status(200).json({ message: 'Camp updated successfully' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },

    async deleteCamp(req, res) {
        try {
            const campId = req.params.id;
            await CampService.deleteCamp(campId);
            res.status(200).json({ message: 'Camp deleted successfully' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
};

module.exports = CampController;
