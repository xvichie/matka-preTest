const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');
const path = require('path'); 

const connection = require('./config/db.js');
const updateSimilars = require('./config/updateSimilars.js');
const userTests = require('./routes/userTests.js')
const payment = require('./routes/payment.js');
const uploadImage = require('./routes/uploadImage.js');

const app = express()
app.use(cors());
app.use(express.json());

connection();
//updateSimilars();

app.use('/api/userTests', userTests);
app.use('/api/payment', payment);
app.use('/api/upload-file-to-cloud-storage', uploadImage)

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

app.use(express.static(path.join(__dirname, 'frontend', 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});


const PORT = process.env.BACKEND_PORT;

app.listen(PORT, () => console.log('Listening on Port:' + PORT));