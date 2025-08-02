const db = require('../config/db');

const Recipient = {
  async findById(recipientId) {
    const [rows] = await db.query("SELECT * FROM recipients WHERE recipient_id = ?", [recipientId]);
    if (rows.length === 0) throw new Error('Recipient not found by id');
    return rows[0];
  },

  async findAll() {
    const [rows] = await db.query("SELECT * FROM recipients");
    return rows;
  },

  async create(recipient) {
    const [result] = await db.query("INSERT INTO recipients SET ?", recipient);
    return result.insertId; // Return the ID of the newly created recipient
  },

  async update(recipientId, recipientData) {
    const [result] = await db.query("UPDATE recipients SET ? WHERE recipient_id = ?", [recipientData, recipientId]);
    if (result.affectedRows === 0) throw new Error('Recipient not found');
    return result;
  },

  async deleteById(recipientId) {
    const [result] = await db.query("DELETE FROM recipients WHERE recipient_id = ?", [recipientId]);
    if (result.affectedRows === 0) throw new Error('Recipient not found');
    return result;
  },
};

module.exports = Recipient;
