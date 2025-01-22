const express = require('express');
const bcrypt = require('bcrypt');
const userRoute = require('./Routes/userRoute.js');
const { syncUser } = require('./Models/index.js');
const authRoute = require('./Routes/authRoute.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

syncUser();
app.use(express.json());
app.use(userRoute);
app.use("/auth" ,authRoute);
app.get('/',(req,res) => {
    res.send('hello world!');
});

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
});
