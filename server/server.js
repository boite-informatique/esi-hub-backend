// import packages
const express = require('express')
const http = require('http')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler')

// initialize server
const app = express()

const server = http.createServer(app)
require('dotenv').config()                  // use environmental variables
require('./db')()                           // connect to database
require('./socketio')(server)               // use socket.io

// render static website
app.use(express.static('../frontend/build'))

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(cookieParser())

// routes
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/announcement', require('./routes/announceRoute'))
app.use('/api/group', require('./routes/groupRoute'))

// error handling
app.use(errorHandler)

// unknown routes
app.use('/*', (req, res) => res.status(404).send('woah this page doesnt exist'))

// server port
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
