const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  input: { type: String, required: true }, // Action or input given by the user
  output: { type: String, required: true }, // Result or message about the action
  createdAt: { type: Date, default: Date.now }, // Optional: Timestamp of log entry
});

const Log = mongoose.model('Log', LogSchema);
module.exports = Log;

