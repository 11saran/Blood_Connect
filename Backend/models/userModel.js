const db = require('../config/db');

const User = {
  async findByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = ?", [email]);
  },
  async findById(userId) {
    return db.query("SELECT id, role, email FROM users WHERE id = ?", [userId]);
  },
  async findAll() {
    return db.query("SELECT id, role, email FROM users");
  },
  async create(user) {
    return db.query("INSERT INTO users SET ?", user);
  },
  async deleteById(userId) {
    return db.query("DELETE FROM users WHERE id = ?", [userId]);
  }

  
};

module.exports = User;
