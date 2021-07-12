import { Avatar } from '@material-ui/core'

import React from 'react'
import './Posts.css'
function Posts({username, caption, imageUrl}) {
    return (
        <div className='post'>
            <div className='post__header'>
            <Avatar className="post__avataar" alt={username} src='avatar1'></Avatar>
            <h3>{username}</h3>
            </div>
            <img alt="" className="post__image" alt= 'Udbhav'src={imageUrl}/>
            <h4 className='post__text'><strong>{username}: </strong>{caption}</h4>
        
        </div>

    )
}

export default Posts
