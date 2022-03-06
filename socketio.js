const socketio = require('socket.io')

module.exports = server => {
  const io = socketio(server)

  io.on('connection', socket => {
    console.log('nice frr')
    
    socket.on('message', msg => {
      io.emit('chatMessage', msg)
    })
  })
}
