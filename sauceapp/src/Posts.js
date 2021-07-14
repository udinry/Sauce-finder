import { Avatar } from '@material-ui/core'
import React, { useState , useEffect } from 'react';
import{db} from './firebase';

import './Posts.css';
function Posts({postId, username, caption, imageUrl}) {

    const[comments, setComments] = useState([]);
    useEffect(() =>{
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection("Posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc)=> doc.data()));
            });

        }

        return () => {
            unsubscribe()
        };
    }, [postId]);

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
