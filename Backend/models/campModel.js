const db = require('../config/db');

const Camp = {
  async findById(campId) {
    const [rows] = await db.query("SELECT * FROM tbl_camp WHERE id = ?", [campId]);
    return rows[0];
  },

  async findAll() {
    const [rows] = await db.query("SELECT * FROM tbl_camp");
    return rows;
  },

  async create(camp) {
    const [result] = await db.query("INSERT INTO tbl_camp SET ?", camp);
    return result.insertId;
  },

  async update(campId, campData) {
    const [result] = await db.query("UPDATE tbl_camp SET ? WHERE id = ?", [campData, campId]);
    return result.affectedRows;
  },

  async deleteById(campId) {
    const [result] = await db.query("DELETE FROM tbl_camp WHERE id = ?", [campId]);
    return result.affectedRows;
  }
};

module.exports = Camp;
