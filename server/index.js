const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const cors = require('cors');

const authRoute = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(authRoute);

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log('DATABASE CONNECTED');
}).catch((err)=>{
    console.log(err);
});

app.listen(port,"0.0.0.0",function () {
    console.log(`The App is running on port: ${port}`);
})