import React from 'react'
import { Link } from 'react-router-dom'
import './Doc.css'

const doc = ({user}) => {
  return (
    <div className='all'>
        

<div className='window'>
  <div className='terminal'>
    <p className='command'>Login into ESI-HUB</p>
    <p className='log'>
      <span>
        Cloning into 'ticgit'...<br />
        remote: Reusing existing pack: 1857, done.<br />
        remote: Total 1857 (delta 0), reused 0 (delta 0)<br />
        Receiving objects: 100% (1857/1857), 374.35 KiB | 268.00 KiB/s, done.<br />
        Resolving deltas: 100% (772/772), done.<br />
        Checking connectivity... done.
      </span>
    </p>
    <p className='command'>Hello {user} start having fun ...</p>
    <Link to="/"><button>Go to Home</button> </Link>
  </div>
</div>
    </div>
  )
}

export default doc