import React from 'react'
import './Message.css';


const Message = ({ body , avatar}) => {
  return (
    <div className= 'message'>
        <div className='messageTop'>
            <img src={avatar} alt='' className='messageImg'/>
            <p className='messageText'>{body}</p>
        </div>
        <div className='messageBottom'>1 hour ago</div>

    </div>
  ) 
}

export default Message