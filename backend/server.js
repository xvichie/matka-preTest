const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');

const connection = require('./config/db.js');
const userTests = require('./routes/userTests.js')

const app = express()
app.use(cors());
app.use(express.json());

connection();

app.use('/api/userTests', userTests);

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dev-qljylwgr26x23vpc.us.auth0.com/.well-known/jwks.json"
    }),
    audience: 'anastasia',
    issuer: 'https://dev-qljylwgr26x23vpc.us.auth0.com/',
    algorithms: ['RS256']
}).unless({ path: ['/'] })
app.use(jwtCheck);

app.get('/', (req, res) => {
    res.send('hello');
})

app.get('/protected', (req, res) => {
    res.send('protected');
})

const PORT = process.env.BACKEND_PORT;

app.listen(PORT, () => console.log('Listening on Port:' + PORT));