const db = require('../config/db');

const Appointment = {
    async findById(appointmentId) {
        const result = await db.query("SELECT * FROM appointment_table WHERE user_email = ?", [appointmentId]);
        if (result.length === 0) throw new Error('Appointment not found by id ');
        return result[0];
    },
    async findAll() {
        return db.query("SELECT * FROM appointment_table");
    },
    async create(appointment) {
        const result = await db.query("INSERT INTO appointment_table SET ?", appointment);
        return result.insertId; // Return the ID of the newly created appointment
    },
    async update(appointmentId, appointmentData) {
        const result = await db.query("UPDATE appointment_table SET ? WHERE user_email = ?", [appointmentData, appointmentId]);
        if (result.affectedRows === 0) throw new Error('Appointment not found');
        return result;
    },
    async updateByEmail(userEmail, appointmentData) {
        const result = await db.query("UPDATE appointment_table SET ? WHERE user_email = ?", [appointmentData, userEmail]);
        if (result.affectedRows === 0) throw new Error('Appointment not found for the provided email');
        return result;
    },
    
    async deleteById(appointmentId) {
        const result = await db.query("DELETE FROM appointment_table WHERE id = ?", [appointmentId]);
        if (result.affectedRows === 0) throw new Error('Appointment not found');
        return result;
    },
    async findAvailableSlots(date) {
        const timeSlots = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
        const appointments = await db.query("SELECT appointment_time FROM appointment_table WHERE appointment_date = ?", [date]);
    
        // Format booked slots to HH:mm
        const bookedSlots = appointments.map(appointment => appointment.appointment_time.slice(0, 5)); 
        return timeSlots.filter(slot => !bookedSlots.includes(slot)); // Now filtering will work correctly
    }
    
};

module.exports = Appointment;
