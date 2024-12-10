const express = require('express');
const router = express.Router();
const Grievance = require('../models/Grievance');
const Log = require('../models/Log');
const auth = require('../middleware/Auth'); // Assuming you have auth middleware

// Submit grievance
router.post('/grievances', auth, async (req, res) => {
  try {
    const { complaintName, description, category, attachments } = req.body;
    
    // Create new grievance
    const grievance = new Grievance({
      complaintName,
      description,
      category,
      attachments,
      user: req.user.id, // From auth middleware
      status: 'pending'
    });

    // Save grievance
    await grievance.save();

    // Create log entry
    const log = new Log({
      username: req.user.username,
      input: `Submitted grievance: ${complaintName}`,
      output: `Grievance created with ID: ${grievance._id}`
    });

    await log.save();

    res.status(201).json({
      success: true,
      data: grievance,
      message: 'Grievance submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting grievance:', error);
    res.status(500).json({
      success: false,
      error: 'Error submitting grievance'
    });
  }
});

// Get user's grievances
router.get('/grievances/user', auth, async (req, res) => {
  try {
    const grievances = await Grievance.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(grievances);
  } catch (error) {
    console.error('Error fetching grievances:', error);
    res.status(500).json({ error: 'Error fetching grievances' });
  }
});

module.exports = router;

// Form submission component (GrievanceForm.jsx)
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/grievances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit grievance');
    }

    const data = await response.json();
    
    // Clear form
    setFormData(initialFormState);
    
    // Show success message
    setMessage('Grievance submitted successfully');
    
    // Redirect to view grievances page after short delay
    setTimeout(() => {
      navigate('/view-grievance');
    }, 1500);

  } catch (error) {
    console.error('Error:', error);
    setMessage('Failed to submit grievance. Please try again.');
  }
};