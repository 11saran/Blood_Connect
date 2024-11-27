const db = require('../config/db');

const PermanentDonation = {
    async findById(donationId) {
        const result = await db.query("SELECT * FROM tbl_recipient_donor WHERE id = ?", [donationId]);
        if (result.length === 0) throw new Error('Donation record not found');
        return result[0];
    },
    async findAll() {
        return db.query("SELECT * FROM tbl_recipient_donor");
    },
    async create(donationData) {
        const result = await db.query("INSERT INTO tbl_recipient_donor SET ?", donationData);
        return result.insertId;
    },
    async update(donationId, donationData) {
        const result = await db.query("UPDATE tbl_recipient_donor SET ? WHERE id = ?", [donationData, donationId]);
        if (result.affectedRows === 0) throw new Error('Donation record not found');
        return result;
    },
    async deleteById(donationId) {
        const result = await db.query("DELETE FROM tbl_recipient_donor WHERE donor_email = ?", [donationId]);
        if (result.affectedRows === 0) throw new Error('Donation record not found');
        return result;
    }
};

module.exports = PermanentDonation;
