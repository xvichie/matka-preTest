const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel.js');

router.post('/', async (req, res) => {
    try {
        console.log(req.errored)
        console.log('Body: ', req.body)
        const test = await new userModel(req.body).save();
        console.log(test);
        res.send(test)
    } catch (error) {
        res.send(error)
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const tests = await userModel.find();
        res.send(tests)
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;