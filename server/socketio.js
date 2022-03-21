const socketio = require('socket.io')

module.exports = server => {
  const io = socketio(server)

  io.on('connection', socket => {
    console.log('user connected')
    
    socket.on('joinRoom', room => {
      socket.join(room)
    })
    socket.on('message', msg => {
        io.to(msg.room).emit('chatMessage', msg)
    })

    socket.on('disconnect', () => console.log('user disconnected'))
  })
}
