// Imported required packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// MongoDB Databse url
let mongoDB = 'mongodb://127.0.0.1:27017/employeeDetails';

// Created express server
const app = express();
app.use(bodyParser.json());
app.use(cors());
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDB)
    .then( () => console.log('Database is connected'))
    .catch( err => console.log(`Error connecting database ${err}`))

// Express routes
const employeeRoutes = require('./Routes/Employee.route');

// Routes Configuration
app.use('/employees', employeeRoutes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server Lisening On Port ${port}`);
});
