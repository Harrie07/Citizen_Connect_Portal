const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema({
  name: String,
  state: String,
  district: String,
  taluka: String,
  address: String
});

module.exports = mongoose.model('Office', officeSchema);


