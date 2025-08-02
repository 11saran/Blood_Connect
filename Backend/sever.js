const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const corsOptions = require('./middleware/corsMiddleware');
const userRoutes = require('./routes/userRoutes');
const donorRoutes = require('./routes/donorRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const campRoutes = require('./routes/campRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const recipientRoutes = require('./routes/recipientRoutes');
const permanentDonationRoutes = require('./routes/permanentDonationRoutes');

const db = require('./config/db');
const upload = require('./middleware/uploads');

dotenv.config({ path: './.env' });

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: ['http://localhost:8081'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));

// ✅ Limit the size of incoming requests
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/api-users', userRoutes);
app.use('/api-donor', donorRoutes);
app.use('/api-disease', diseaseRoutes);
app.use('/api-camp', campRoutes);
app.use('/api-appointments', appointmentRoutes);
app.use('/api-recipients', recipientRoutes);
app.use('/api-donations', permanentDonationRoutes);

// ✅ Test DB connection
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ Connected to MySQL Database");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

// ✅ Start Server
app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
