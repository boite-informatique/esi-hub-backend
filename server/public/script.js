const socket = io()

const params = new URLSearchParams(window.location.search);
console.log(params)
const username = params.get("username");
const room = params.get("room");
socket.emit('joinRoom', room)
document.getElementById('username').textContent += username
document.getElementById('room').textContent += room
const msgForm = document.querySelector('form')
const ul = document.querySelector('ul')
const color = '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)

msgForm.addEventListener('submit', e => {
  e.preventDefault();
  let msg = e.target[0].value
  socket.emit('message', {username, msg, room, color})
})
socket.on('chatMessage', msg => {
  const div = document.createElement('div');
  div.style.color = msg.color
  div.innerHTML = msg.username + ' : ' + msg.msg
  document.querySelector('ul').insertBefore(div, document.querySelector('ul').firstChild);
})