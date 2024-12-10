const mongoose = require('mongoose');

const GrievanceSchema = new mongoose.Schema({
  complaintName: String,
  description: String,
  category: String,
  attachments: [String],
  status: {
    type: String,
    enum: ['pending', 'in progress', 'resolved'],
    default: 'pending'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grievance', GrievanceSchema);



