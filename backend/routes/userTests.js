const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel.js');

router.post('/', async (req, res) => {
    try {
        //console.log(req.errored)
        //console.log('Body: ', req.body)
        console.log("Data received from frontend:", req.body);
        const test = await new userModel(req.body).save();
        console.log(test);
        res.send(test)
    } catch (error) {
        console.error("Error while saving data:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const email = req.query.email;
        const tests = await userModel.find({ email }).lean();
        //console.log(tests);
        if (!tests) {
            return res.status(404).json({ message: 'User not found' });
        }

        // You can do further processing or return the user data
        res.json(tests);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;