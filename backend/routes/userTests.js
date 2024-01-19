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

router.get('/getTestById/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Assuming YourModel is the Mongoose model representing your MongoDB collection
      const test = await userModel.findById(id);
  
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }
  
      // If the test with the given _id is found, return it
      res.status(200).json(test);
    } catch (error) {
      // Handle any potential errors
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;