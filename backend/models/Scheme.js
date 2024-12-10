// models/Scheme.js

const mongoose = require('mongoose');


// Define the schema for government schemes
const schemeSchema = new mongoose.Schema({
  name: String,
  eligibility: String,
  startDate: String,
  endDate: String,
  website: String
});

// Create and export the model
const Scheme = mongoose.model('Scheme', schemeSchema);

module.exports = Scheme;
