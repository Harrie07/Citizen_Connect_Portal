const express = require('express');
const router = express.Router();
const Office = require('../models/Office');  // Import Office model

router.get('/', async (req, res) => {
    const { state, district, taluka } = req.query;
  

  if (!state) {
    return res.status(400).json({ message: "State parameter is required" });
  }
    try {
      const query = { state };
  
      if (district) {
        query.district = district;
      }
  
      if (taluka) {
        query.taluka = taluka;
      }
  
      console.log("Querying MongoDB with:", query);  // Log the query to check what is being sent to MongoDB
  
      const offices = await Office.find(query);  // Fetch offices based on the query
      console.log("Offices found:", offices);  // Log the fetched offices
      res.json(offices);  // Send fetched offices back to the frontend
    } catch (error) {
      console.error('Error fetching offices:', error);
      res.status(500).json({ message: 'Error fetching offices', error });
    }
  });
  

module.exports = router;

