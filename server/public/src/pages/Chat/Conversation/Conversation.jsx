import React from 'react'
import './Conversation.css'
import img from "/assets/logoHome.png"
const Conversation = ({name , avatar}) => {
  return (
    <div className='conversation'>
        <img className='conversationImg' src={avatar} alt='' />
        <span className='conversationName'>{name}</span>

    </div>
  )
}

export default Conversation