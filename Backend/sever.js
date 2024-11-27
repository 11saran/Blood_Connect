const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const corsOptions = require('./middleware/corsMiddleware');
const userRoutes = require('./routes/userRoutes');
const donorRoutes = require('./routes/donorRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const campRoutes = require('./routes/campRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const recipientRoutes = require('./routes/recipientRoutes');
const permanentDonationRoutes = require('./routes/permanentDonationRoutes');

const db = require('./config/db');
const path = require('path');
const upload = require('./middleware/uploads');

dotenv.config({ path: './.env' });

const app = express();

// CORS setup
app.use(cors({
  origin: ['http://localhost:8081'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));

// Limit the size of incoming requests
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api-users', userRoutes);
 app.use('/api-donor', donorRoutes);
app.use('/api-disease', diseaseRoutes);
app.use('/api-camp', campRoutes);
app.use('/api-appointments', appointmentRoutes);
app.use('/api-recipients', recipientRoutes);
app.use('/api-donations', permanentDonationRoutes);





db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});



app.listen(5000, () => {
  console.log('Server running on port 5000');
});
