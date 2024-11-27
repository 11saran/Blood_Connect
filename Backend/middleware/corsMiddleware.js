// middleware/corsMiddleware.js
const cors = require("cors");

const corsOptions = {
  origin: ['http://localhost:8081'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
