import React from 'react'
import './ChatOnline.css'
import img from "/assets/logoHome.png"


const ChatOnline = ({name ,avatar}) => {
  return (
    <div className='chatOnline'>
        <div className='chatOnlineFriend' >
            <div className='chatOnlineImgContainer'>
                <img className='chatOnlineImg' src={avatar} alt=''/>
                <div className='chatOnlineBadge'></div>
            </div>
            <span className='chatOnlineName'> {name}</span>
        </div>
    </div>
  )
}

export default ChatOnline