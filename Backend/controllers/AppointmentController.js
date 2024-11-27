const AppointmentService = require('../services/appointmentService');

const AppointmentController = {
    async createAppointment(req, res) {
        try {
            const appointmentData = req.body;
            const newAppointmentId = await AppointmentService.createAppointment(appointmentData);
            res.status(201).json({ message: 'Appointment created successfully', appointmentId: newAppointmentId });
        } catch (err) {
            console.error('Error creating appointment:', err);
            res.status(400).json({ message: err.message });
        }
    },

    async getAppointmentById(req, res) {
        try {
            const appointmentId = req.params.id;
            const appointment = await AppointmentService.getAppointmentById(appointmentId);
            res.status(200).json(appointment);
        } catch (err) {
            console.error('Error fetching appointment:', err);
            res.status(404).json({ message: err.message });
        }
    },

    async getAllAppointments(req, res) {
        try {
            const appointments = await AppointmentService.getAllAppointments();
            res.status(200).json(appointments);
        } catch (err) {
            console.error('Error fetching appointments:', err);
            res.status(500).json({ message: 'Error fetching appointments' });
        }
    },

    async updateAppointment(req, res) {
        try {
            const userEmail = req.params.email; // Use user_email instead of id
            const appointmentData = req.body;
            await AppointmentService.updateAppointment(userEmail, appointmentData); // Pass userEmail to service
            res.status(200).json({ message: 'Appointment updated successfully' });
        } catch (err) {
            console.error('Error updating appointment:', err);
            res.status(404).json({ message: err.message }); // Consider using 500 for server errors
        }
    },
    
    async deleteAppointment(req, res) {
        try {
            const appointmentId = req.params.id;
            await AppointmentService.deleteAppointment(appointmentId);
            res.status(200).json({ message: 'Appointment deleted successfully' });
        } catch (err) {
            console.error('Error deleting appointment:', err);
            res.status(404).json({ message: err.message });
        }
    },

    async getAvailableSlots(req, res) {
        try {
            const { date } = req.query; // Get date from query parameters
            const availableSlots = await AppointmentService.getAvailableSlots(date);
            res.status(200).json(availableSlots);
        } catch (err) {
            console.error('Error fetching available slots:', err);
            res.status(400).json({ message: err.message });
        }
    }
};

module.exports = AppointmentController;
