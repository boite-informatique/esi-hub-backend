import React, { useEffect, useState } from 'react'
import { SidebarClose, SidebarOpen } from '../../components/Sections'
import TopBar from '../../components/TopBar'
import './Chat.css'
import ChatOnline from './chatOnline/ChatOnline'
import Conversation from './Conversation/Conversation'
import Message from './Message/Message'
import { FaPlus } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import img from "/assets/miloudiz.jpg"
import img2 from "/assets/amine.jpg"
import img3 from "/assets/logoHome.png"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateChatRoom from './CreateChatRoom/CreateChatRoom'
import sio from 'socket.io-client'
import axios from 'axios'
import { useQuery } from 'react-query'
import Cookies from 'js-cookie'
import { ListItem, ListItemText, List } from '@mui/material'

const socket = sio("http://localhost:3005", {
  withCredentials: true,
  query: {
    jwt: Cookies.get('accessToken')
  }
})

function Chat() {

  useEffect(() => {
    socket.on('authorized', (user) => {
      console.log('authorizd lol')
      setCurrentUser(user)
      socket.on("join-rooms", (data) => setconversations(data))
    })

  }, [])
  const [currentUser, setCurrentUser] = useState({})
  const [users, setUsers] = useState([
    { id: 0, name: "user1", avatar: img3 }
    , { id: 1, name: "users2", avatar: img2 }
    , { id: 3, name: "user3", avatar: img }
  ]);

  const fetchUsers = async () =>
    await axios.get(`http://localhost:3005/api/user/?search=${searchUsersQuery}`, {
      withCredentials: true,
    })

  const { data, error, status, refetch, ...other } = useQuery(
    "users",
    fetchUsers
  )

  const [searchUsersQuery, setSearchUsersQuery] = useState('')

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [messages, setMessages] = useState(null)

  const [conversations, setconversations] = useState([
    { id: 0, name: "salam", avatar: img3 }
    , { id: 1, name: "zo3ama", avatar: img2 }
    , { id: 3, name: "perfecto", avatar: img }
  ])

  const [chatsOnline, setChatsOnline] = useState([
    { id: 0, name: "amine", avatar: img }
    , { id: 1, name: "moahmed", avatar: img2 }
    , { id: 3, name: "chakib", avatar: img3 }
  ])
  const [newRoomData, setNewRoomData] = useState({ name: '', participants: '' });
  const [currentRoom, setCurrentRoom] = useState('')
  const [myMessage, setMyMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewMessage = (msg) => {
    setMessages([...messages, msg])
  }


  const handleClick = () => {
    if (!myMessage) return
    setMessages([...messages, { body: myMessage, avatar: img }])
    socket.emit("message", { body: myMessage })
    document.getElementById("btn").value = "";

  }

  const handleAddConversation = () => {
    console.log('creating room', currentUser)
    socket.emit('create-room', { room: newRoomData, user: currentUser })
    setconversations([...conversations, { id: 8, name: newRoomData.name, avatar: img3 }])
    setOpen(false);
  }

  const handleChangeCreateRoom = (event) => {
    const { name, value } = event.target
    setNewRoomData((values) => ({ ...values, [name]: value }))
  }

  return (
    <>
      <TopBar />
      <SidebarOpen />
      <div className='messenger'>
        {open && <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create new chat room
              </Typography>
              <input placeholder='Name' name='name' className='chatMenuInputt' value={newRoomData.name} onChange={handleChangeCreateRoom} />
              <input placeholder='Add users by email separated by comma (,)' name='participants' value={newRoomData.participants} className='chatMenuInputt' onChange={handleChangeCreateRoom} />
              <span>image</span>
              <span></span><br />
              <button className='chatSubmitButtonn' onClick={handleAddConversation}>Add </button>
            </Box>
          </Modal>
        </div>}
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input placeholder='Search for friends' className='chatMenuInput' />
            <button className='plusIcon' onClick={() => setOpen(true)} ><FaPlus /></button>
            <List>
              {conversations.map((conv, index) =>
                <ListItem key={index} button onClick={() => setCurrentRoom(conv._id)}>
                  <ListItemText primary={conv.name} />
                </ListItem>
              )}
            </List>

          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            <div className='chatBoxTop'>

              {messages && messages.map((msg, index) => (<Message avatar={msg.avatar} body={msg.body} key={index} />))}


            </div>
            <div className='chatBoxBottom'>
              <textarea className='chatMessageInput' placeholder='write something...' onChange={(e) => {
                setMyMessage(e.currentTarget.value)
              }} id="btn"></textarea>
              <button className='chatSubmitButton' onClick={handleClick} > Send</button>
            </div>
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            {chatsOnline.map((chatOn, index) => (<ChatOnline name={chatOn.name} avatar={chatOn.avatar} key={index} />))}

          </div>
        </div>
      </div>

    </>
  )
}

export default Chat