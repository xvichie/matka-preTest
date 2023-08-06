const express = require('express');
const router = express.Router();
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
    let status,error;
    const {token,amount } = req.body;
    try {
        await Stripe.charges.create({
            source: token.id,
            amount,
            currency:'usd'
        })
        status = 'success';

    } catch (error) {
        status='failure'
    }
    res.json({error,status});
})

module.exports = router;