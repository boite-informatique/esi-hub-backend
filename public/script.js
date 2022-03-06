const socket = io()

const params = new URLSearchParams(window.location.search);

const username = params.get("username");
const room = params.get("room");

document.getElementById('username').textContent += username
document.getElementById('room').textContent += room
const msgForm = document.querySelector('form')
const ul = document.querySelector('ul')

msgForm.addEventListener('submit', e => {
  e.preventDefault();
  let msg = e.target[0].value
  socket.emit('message', {username, msg, room})
})

socket.on('chatMessage', msg => {
  const div = document.createElement('div');
  div.textContent = msg.username + ' : ' + msg.msg
  document.querySelector('ul').appendChild(div);
})