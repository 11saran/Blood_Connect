const db = require('../config/db');

const Disease = {
  async findById(diseaseId) {
    return db.query("SELECT * FROM disease_table WHERE id = ?", [diseaseId]);
  },
  async findAll() {
    return db.query("SELECT * FROM disease_table");
  },
  async create(disease) {
    return db.query("INSERT INTO disease_table SET ?", disease);
  },
  async update(diseaseId, diseaseData) {
    return db.query("UPDATE disease_table SET ? WHERE id = ?", [diseaseData, diseaseId]);
  },
  async deleteById(diseaseId) {
    return db.query("DELETE FROM disease_table WHERE id = ?", [diseaseId]);
  }
};

module.exports = Disease;
