const db = require('../config/db');

const User = {
  async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
  },

  async findById(userId) {
    const [rows] = await db.query("SELECT id, role, email FROM users WHERE id = ?", [userId]);
    return rows;
  },

  async findAll() {
    const [rows] = await db.query("SELECT id, role, email FROM users");
    return rows;
  },

  async create(user) {
    const [result] = await db.query("INSERT INTO users SET ?", user);
    return result;
  },

  async createAdminDetails(adminDetails) {
    const [result] = await db.query("INSERT INTO admin_details SET ?", adminDetails);
    return result;
  },

  async findAdminDetailsByAdminId(adminId) {
    const [rows] = await db.query("SELECT * FROM admin_details WHERE admin_id = ?", [adminId]);
    return rows;
  },

  async delete(userId) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [userId]);
    return result;
  }
};

module.exports = User;
