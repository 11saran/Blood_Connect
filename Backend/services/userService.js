const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const ADMIN_SECRET_CODE = process.env.ADMIN_CODE || 'ADMIN1234';

const UserService = {
  // Register
  async register({ role, email, password, adminCode }) {
    const existingUsers = await User.findByEmail(email);
    if (existingUsers && existingUsers.length > 0) throw new Error('Email already exists');

    if (role === 'admin') {
      if (!adminCode || adminCode !== ADMIN_SECRET_CODE) {
        throw new Error('Invalid or missing admin code');
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { role, email, password: hashedPassword };

    const result = await User.create(newUser);
    const userId = result.insertId || result.id;

    if (role === 'admin') {
      await User.createAdminDetails({ admin_id: userId, admin_code: adminCode });
    }

    return { id: userId, role, email };
  },

  // Login
  async login({ email, password, adminCode }) {
    if (!email || !password) throw new Error('Email and password are required');

    const users = await User.findByEmail(email.trim());
    if (!users || users.length === 0) throw new Error('Invalid email or password');

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    if (user.role === 'admin') {
      if (!adminCode) throw new Error('Admin code is required');
      const adminDetails = await User.findAdminDetailsByAdminId(user.id);
      if (
        !adminDetails.length ||
        adminCode.trim().toLowerCase() !== adminDetails[0].admin_code.trim().toLowerCase()
      ) {
        throw new Error('Invalid admin code');
      }
    }

    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  // ✅ Get Users
  async getUsers(userId = null) {
    if (userId) {
      return await User.findById(userId);
    }
    return await User.findAll();
  },

  // ✅ Delete User
  async deleteUser(userId) {
    const result = await User.delete(userId);
    if (result.affectedRows === 0) throw new Error('User not found');
    return true;
  }
};

module.exports = UserService;
