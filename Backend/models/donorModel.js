const db = require('../config/db');

const Donor = {
  async findByEmail(email) { // Rename findById to findByEmail
    return db.query("SELECT * FROM donors WHERE userEmail = ?", [email]);
},
  async findAll() {
    return db.query("SELECT * FROM donors");
  },
  async create(donor) {
    return db.query("INSERT INTO donors SET ?", donor);
  },
  async update(id, donorData) {
    console.log(`Executing query to update donor: UPDATE donors SET ? WHERE id = ?`, [donorData, id]);
    return db.query("UPDATE donors SET ? WHERE id = ?", [donorData, id]);
  }
  
  ,
  async updateE(email, donorData) {
    return db.query("UPDATE donors SET ? WHERE userEmail = ?", [donorData, email]);
  }
  ,
  async updateID(donorId, donorData) {
    return db.query("UPDATE donors SET ? WHERE id = ?", [donorData, donorId]);
  },
  async deleteById(donorId) {
    return db.query("DELETE FROM donors WHERE id = ?", [donorId]);
  }
};

module.exports = Donor;
