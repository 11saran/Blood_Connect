const db = require('../config/db');

const Camp = {
  async findById(campId) {
    return db.query("SELECT * FROM tbl_camp WHERE id = ?", [campId]);
  },
  async findAll() {
    return db.query("SELECT * FROM tbl_camp");
  },
  async create(camp) {
    return db.query("INSERT INTO tbl_camp SET ?", camp);
  },
  async update(campId, campData) {
    return db.query("UPDATE tbl_camp SET ? WHERE id = ?", [campData, campId]);
  },
  async deleteById(campId) {
    return db.query("DELETE FROM tbl_camp WHERE id = ?", [campId]);
  }
};

module.exports = Camp;
