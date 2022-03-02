// import packages and initialize app
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const connectDB = require('./db');
const errorHandler = require('./middleware/errorHandler');
const authorize = require('./middleware/authorize');

connectDB();
// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//routes
app.get('/private', authorize, (req, res) => res.json({status : "success, user authorized"}));
app.use('/api/user',  require('./routes/userRoute'));
app.use('/api/announcement', require('./routes/announceRoute'));

// error handling
app.use(errorHandler);

// server port

app.listen(PORT, () => console.log(`server running on ${PORT}`));
