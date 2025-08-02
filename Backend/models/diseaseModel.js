const db = require('../config/db');

const Disease = {
  async findById(diseaseId) {
    const [rows] = await db.query("SELECT * FROM diseases WHERE id = ?", [diseaseId]);
    return rows[0]; // return single disease
  },

  async findAll() {
    const [rows] = await db.query("SELECT * FROM diseases");
    return rows;
  },

  async create(disease) {
    const [result] = await db.query("INSERT INTO diseases SET ?", disease);
    return result.insertId;
  },

  async update(diseaseId, diseaseData) {
    const [result] = await db.query("UPDATE diseases SET ? WHERE id = ?", [diseaseData, diseaseId]);
    return result.affectedRows;
  },

  async deleteById(diseaseId) {
    const [result] = await db.query("DELETE FROM diseases WHERE id = ?", [diseaseId]);
    return result.affectedRows;
  }
};

module.exports = Disease;
