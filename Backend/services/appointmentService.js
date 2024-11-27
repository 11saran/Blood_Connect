const Appointment = require('../models/appointmentModel');

const AppointmentService = {
    async createAppointment(appointmentData) {
        return Appointment.create(appointmentData);
    },
    
    async getAppointmentById(appointmentId) {
        return Appointment.findById(appointmentId);
    },

    async getAllAppointments() {
        return Appointment.findAll();
    },

    async updateAppointment(userEmail, appointmentData) {
        return Appointment.updateByEmail(userEmail, appointmentData); // Call the new method to update by email
    },

    async deleteAppointment(appointmentId) {
        return Appointment.deleteById(appointmentId);
    },

    async getAvailableSlots(date) {
        return Appointment.findAvailableSlots(date);
    }
};

module.exports = AppointmentService;
