const express = require('express');
const router = express.Router();
const userModel = require("../../models/user.model");


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {

        const userId = await userModel.loginUser(username, password);
        if (userId === null) {
            res.status(200).json({ success: 'ko', error_msg: "Username o password errati" })
        } else {
            res.status(200).json({ success: 'ok', _id: userId[0]['_id'], username: userId[0]['username'] })
        }

    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {

        const userId = await userModel.createUser(username, password);
        res.status(201).json({ success: 'ok', _id: userId, username: username });

    } catch (error) {
        if (error.message === 'Username already exists') {
            // Inform the user that the username is already taken
            res.status(200).send({ success: 'ko', error_msg: "Username già registrato" });
        } else {
            // Handle other errors
            res.status(500).send('An error occurred');
        }
    }
});

module.exports = router;