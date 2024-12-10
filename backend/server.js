require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const authMiddleware = require('./middleware/Auth');

// Constants and environment variables
const DEFAULT_OTP = "123456"; // Default OTP for testing
const PORT = process.env.PORT || 5000;
const connectionString = process.env.DB_CONNECTION_STRING;

// Import models
const Scheme = require('./models/Scheme');
const Grievance = require('./models/Grievance');
const User = require('./models/User');
const Log = require('./models/Log');

// Import routes
const authRoutes = require('./routes/Auth');
const officeRoutes = require('./routes/Office');
const adminRoutes = require('./routes/Admin');
const nearbyOfficeRoutes = require('./routes/NearbyGovernmentOffices');
const adminLoginRoutes = require('./routes/AdminLogin');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/nearby-offices', nearbyOfficeRoutes);
app.use('/api/admin', adminLoginRoutes);

// File upload setup with Multer
const upload = multer({ 
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Simplified send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    
    if (!mobileNumber) {
      return res.status(400).json({
        error: 'Mobile number is required',
        details: 'Please provide a valid mobile number'
      });
    }

    // Always return success with the default OTP
    res.json({
      message: 'OTP sent successfully',
      debug: {
        otp: DEFAULT_OTP,
        expiresIn: 300
      },
      status: 'success'
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      error: 'Failed to send OTP',
      details: error.message
    });
  }
});

// Simplified verify OTP endpoint
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'Both mobile number and OTP are required'
      });
    }

    // Check if OTP matches the default OTP
    if (otp === DEFAULT_OTP) {
      res.json({
        message: 'OTP verified successfully',
        status: 'approved'
      });
    } else {
      res.status(400).json({
        error: 'Invalid OTP',
        details: 'Invalid OTP. Please try again.',
        remainingAttempts: 2 // Static value for simplicity
      });
    }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({
      error: 'Failed to verify OTP',
      details: error.message
    });
  }
});

app.get('/api/grievances/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming auth middleware adds user to req
    const grievances = await Grievance.find({ userId })
      .sort({ submittedAt: -1 });
    res.json(grievances);
  } catch (error) {
    console.error('Error fetching user grievances:', error);
    res.status(500).json({ error: 'Failed to fetch grievances' });
  }
});

// Submit new grievance
// In server.js, update the grievances POST endpoint
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'Both mobile number and OTP are required'
      });
    }

    // Check if OTP matches the default OTP
    if (otp === DEFAULT_OTP) {
      // Generate a JWT token
      const token = jwt.sign(
        { 
          mobileNumber,
          userId: mobileNumber // Using mobile number as userId for demo
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'OTP verified successfully',
        status: 'approved',
        token: token,
        userId: mobileNumber
      });
    } else {
      res.status(400).json({
        error: 'Invalid OTP',
        details: 'Invalid OTP. Please try again.',
        remainingAttempts: 2
      });
    }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({
      error: 'Failed to verify OTP',
      details: error.message
    });
  }
});
app.post('/api/grievances', upload.array('attachments'), async (req, res) => {
  try {
    const { complaintName, description, category, location } = req.body;
    const attachments = req.files ? req.files.map(file => file.path) : [];

    if (!complaintName || !description || !category || !location) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newGrievance = new Grievance({
      complaintName,
      description,
      category,
      attachments,
      location,
      status: 'Pending', // Default status
      submittedAt: new Date()
    });

    const savedGrievance = await newGrievance.save();
    res.status(200).json(savedGrievance);

  } catch (error) {
    console.error('Error saving grievance:', error);
    res.status(500).json({ error: 'Failed to submit grievance' });
  }
});

// Get all grievances (for admin)
app.get('/api/grievances', async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({ submittedAt: -1 });
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grievances', error });
  }
});

// Schemes API route
app.get('/api/schemes', async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schemes', error });
  }
});

// Logging user inputs and outputs (for admin)
app.post('/api/logs', async (req, res) => {
  const { username, input, output } = req.body;
  try {
    const log = new Log({
      username,
      input,
      output,
      timestamp: new Date()
    });
    await log.save();
    res.status(201).json({ message: 'Log created successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating log', error });
  }
});

// Get all logs (for admin)
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs', error });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Default OTP for testing: ${DEFAULT_OTP}`);
});

module.exports = app;

