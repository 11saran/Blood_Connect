const UserService = require('../services/userService');

const UserController = {
  async registerUser(req, res) {
    try {
      const { role, email, password, adminCode } = req.body;
      await UserService.register({ role, email, password, adminCode });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login({ email, password });
      
      res.status(200).json({ message: 'Login successful', role: user.role });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getUsers(req, res) {
    try {
      const userId = req.params.id;
      const users = await UserService.getUsers(userId);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      await UserService.deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};

module.exports = UserController;
