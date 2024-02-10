const express = require('express');
const router = express.Router();

// Example user route
router.get('/', (req, res) => {
    res.send('users');
});

router.get('/list', (req, res) => {
    res.send('list of users');
});

module.exports = router;