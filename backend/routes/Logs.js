const express = require('express');
const Log = require('../models/Log');
const router = express.Router();

// Route to create a new log entry
router.post('/logs', async (req, res) => {
    const { username, input, output } = req.body;

    try {
        const log = new Log({ username, input, output });
        await log.save();
        res.status(201).json({ message: 'Log created successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating log', error });
    }
});

// Route to get all logs (for admin)
router.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find({});
        res.json({ logs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error });
    }
});

module.exports = router;
