const db = require('../config/db');

const Recipient = {
    async findById(recipientId) {
        const result = await db.query("SELECT * FROM tbl_recipient WHERE id = ?", [recipientId]);
        if (result.length === 0) throw new Error('Recipient not found by id');
        return result[0];
    },

    async findAll() {
        return db.query("SELECT * FROM tbl_recipient");
    },

    async create(recipient) {
        const result = await db.query("INSERT INTO tbl_recipient SET ?", recipient);
        return result.insertId; // Return the ID of the newly created recipient
    },

    async update(recipientId, recipientData) {
        const result = await db.query("UPDATE tbl_recipient SET ? WHERE id = ?", [recipientData, recipientId]);
        if (result.affectedRows === 0) throw new Error('Recipient not found');
        return result;
    },

    async deleteById(recipientId) {
        const result = await db.query("DELETE FROM tbl_recipient WHERE id = ?", [recipientId]);
        if (result.affectedRows === 0) throw new Error('Recipient not found');
        return result;
    },
    
};

module.exports = Recipient;
