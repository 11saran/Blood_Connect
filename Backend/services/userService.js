const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const UserService = {
  async register({ role, email, password, adminCode }) {
    const [existingUser] = await User.findByEmail(email);
    if (existingUser) throw new Error('Email already exists');
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      role,
      email,
      password: hashedPassword,
      admin_code: role === 'admin' ? adminCode : null,
    };

    return User.create(newUser);
  },


  async login({ email, password }) {
    const [user] = await User.findByEmail(email.trim());
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    return user;
  },

  // async login(req, res) {
  //   try {
  //     const { email, password } = req.body;
  //     const [user] = await User.findByEmail(email.trim());
  
  //     // Check if the user exists
  //     if (!user) {
  //       return res.status(400).json({ message: 'Invalid email or password' });
  //     }
  
  //     // Validate password
  //     const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
  //     if (!isPasswordValid) {
  //       return res.status(400).json({ message: 'Invalid email or password' });
  //     }
  
  //     // Successful login, return user and success message
  //     return res.status(200).json({ message: 'Login successful', user });
  //   } catch (error) {
  //     // Handle other errors
  //     return res.status(500).json({ message: 'Something went wrong', error: error.message });
  //   }
  // },
  

  async getUsers(userId) {
    if (userId) {
      return User.findById(userId);
    }
    return User.findAll();
  },

  async deleteUser(userId) {
    const result = await User.deleteById(userId);
    if (result.affectedRows === 0) throw new Error('User not found');
    return result;
  }
};

module.exports = UserService;
