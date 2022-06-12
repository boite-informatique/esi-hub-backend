import React from 'react'
import './Conversation.css'
import img from "/assets/logoHome.png"
const Conversation = ({name , avatar , handleClick}) => {
  return (
    <div className='conversation' onClick={handleClick}>
        <img className='conversationImg' src={avatar} alt='' />
        <span className='conversationName'>{name}</span>

    </div>
  )
}

export default Conversation