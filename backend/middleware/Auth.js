const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure environment variables are loaded

// Middleware function to verify JWT
module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token is not provided
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the secret from the .env file
        req.user = decoded.userId; // Attach the user ID to request object
        next(); // Call the next middleware/route handler
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

