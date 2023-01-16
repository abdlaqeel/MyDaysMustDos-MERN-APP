const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express(); //create an instant of express to be used to convert data to json
app.use(express.json());

//Configure a Port for server
const PORT = process.env.PORT || 5500; //using dotenv to hide data
app.use(cors());

//importing routes
const mustDoItemsRoute = require('./routes/mustDoItems')

//Connection to MangoDB
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Connected to MangoDB Database"))
.catch(err => console.log(err))





// connect to database
  app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));

  app.use('/', mustDoItemsRoute);