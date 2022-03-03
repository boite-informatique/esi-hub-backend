// import packages and initialize app
const express = require('express')
const app = express()
require('dotenv').config() // use environmental variables
const PORT = process.env.PORT || 3000
require('./db')() // connects to database
const errorHandler = require('./middleware/errorHandler')
const authorize = require('./middleware/authorize')
const cors = require('cors');

// middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

// routes
app.get('/private', authorize, (req, res) => res.json({ status: 'success used logged in', user: req.user }))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/announcement', require('./routes/announceRoute'))

// error handling
app.use(errorHandler)

// unknown routes
app.get('/*', (req, res) => res.send('woah this page doesnt exist'));
// server port

app.listen(PORT, () => console.log(`server running on ${PORT}`))
