const express = require('express');
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const privatePosts = require('./routes/PrivatePosts')

const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(
    process.env.DB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, console.log('Starting DB'))

const app = express();

app.use(express.json())

app.use('/api/user', authRoute);
app.use('/api/private', privatePosts);

app.listen( process.env.CONNECTION_STRING || 3000);
