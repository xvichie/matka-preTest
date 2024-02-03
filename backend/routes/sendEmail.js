const express = require('express');
const router = express.Router();
const EmailSubmission = require('../models/emailSubmission.js');


router.post('/', async (req, res) => {
    const { email } = req.body;
    const ipAddress = req.ip; // Express automatically extracts the IP address from the request
  
    // Check if the IP has submitted three emails in the last 24 hours
    const submissionCount = await EmailSubmission.countDocuments({
      ipAddress,
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
  

    console.log(submissionCount);

    if (submissionCount >= 3) {
      return res.status(429).json({ error: 'Email submission limit exceeded' });
    }
  
    // Process the form submission
    const newSubmission = new EmailSubmission({ email, ipAddress });
    await newSubmission.save();
  
    res.json({ success: true });
  });

module.exports = router;