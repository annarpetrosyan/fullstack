const express = require('express'); // require import express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // require import express
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const cors = require('cors');
const morgan = require('morgan');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys')
const  app = express(); //  new object , we can call all functions of express on app


// connect to db
mongoose.connect(keys.MONGO_URI)
    .then(()=> console.log('MongoDB connected.'))
    .catch( error => console.log(error));

// app.use(morgan('dev'));
// app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;