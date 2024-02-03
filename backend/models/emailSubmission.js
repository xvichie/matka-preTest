const mongoose = require('mongoose');

// Define the Mongoose schema
const emailSubmissionSchema = new mongoose.Schema({
    email: String,
    ipAddress: String,
    timestamp: { type: Date, default: Date.now }
});

// Create the model using the schema
const EmailSubmission = mongoose.model('EmailSubmission', emailSubmissionSchema);

module.exports = EmailSubmission;