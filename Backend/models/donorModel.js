const db = require('../config/db');

const Donor = {
  // ✅ Find donor by email
  async findByEmail(email) {
    return db.query("SELECT id, donorName, userEmail AS email, bloodType, phone FROM donors WHERE userEmail = ?", [email]);
  },

  // ✅ Get all donors
  async findAll() {
    return db.query("SELECT id, donorName, userEmail AS email, bloodType, phone FROM donors");
  },

  // ✅ Create donor (email included)
  async create(donor) {
    return db.query("INSERT INTO donors (donorName, userEmail, bloodType, phone) VALUES (?, ?, ?, ?)", 
      [donor.donorName, donor.userEmail, donor.bloodType, donor.phone]);
  },

  // ✅ Update donor by ID
  async update(id, donorData) {
    console.log(`Executing query to update donor: UPDATE donors SET ? WHERE id = ?`, [donorData, id]);
    return db.query("UPDATE donors SET ? WHERE id = ?", [donorData, id]);
  },

  // ✅ Update donor by email
  async updateE(email, donorData) {
    return db.query("UPDATE donors SET ? WHERE userEmail = ?", [donorData, email]);
  },

  // ✅ Update donor by ID (alternative)
  async updateID(donorId, donorData) {
    return db.query("UPDATE donors SET ? WHERE id = ?", [donorData, donorId]);
  },

  // ✅ Delete donor
  async deleteById(donorId) {
    return db.query("DELETE FROM donors WHERE id = ?", [donorId]);
  }
};

module.exports = Donor;
