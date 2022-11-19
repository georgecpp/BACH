const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const productsRoute = require('./routes/productsRoute');
const symphonyRoute = require('./routes/symphony');
const userRoute = require('./routes/user');
const teamRoute = require('./routes/team');

// Connect to DB  -- implement.
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to db!')
});

// Middlewares
app.use(express.json({limit: '50mb'}));
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));
// Route Middlewares
app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/products', productsRoute);
// app.use('/symphony', symphonyRoute);
// app.use('/user', userRoute);
// app.use('/team', teamRoute);

app.listen(process.env.PORT || 2409, () => {
    console.log('Server Up and running!');
});