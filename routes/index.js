const express = require('express');
const router = express.Router();

// GET home page
router.get('/', (req, res, next) => {
    res.status(200).send('Welcome to the Express.js API!');
});

// Example of another route, e.g., a health check endpoint
router.get('/health', (req, res, next) => {
    res.status(200).json({ status: 'UP' });
});

module.exports = router;
