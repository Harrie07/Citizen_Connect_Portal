// routes/NearbyGovernmentOffices.js

const express = require('express');
const router = express.Router();
const Office = require('../models/Office');
const Log = require('../models/Log');

// Fetch nearby government offices based on location filters
router.get('/search', async (req, res) => {
  const { state, district, taluka } = req.query;

  try {
    // Log the user's search activity
    const log = new Log({
      username: req.user ? req.user.username : 'Anonymous',
      input: `Searched for offices in state: ${state}, district: ${district}, taluka: ${taluka}`,
      output: 'Office search result'
    });
    await log.save();

    // Fetch and return the office data
    const offices = await Office.find({ state, district, taluka });
    res.json(offices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offices', error });
  }
});

module.exports = router;

  