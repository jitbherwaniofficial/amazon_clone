const express = require('express');

const app = express();
const authRoute = require('./router/auth');
const port = process.env.PORT || 3000;

app.use(authRoute);

app.listen(port,function () {
    console.log(`The App is running on port: ${port}`);
})