import {firestore} from './firebase';
import logo from '././Images/logo.PNG';
import './App.css';
import { db } from './firebase';
import Posts from './Posts';
import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    db.collection('Posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  return (
    <div className="app">
        <div className="app__header">
          <img 
          className="app__headerImage"
          src={logo} alt=""
          />

          {
            posts.map(post => (
              <Posts username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
          }
          <Posts username="Udbhav Naryani" caption="*InsertCoolCaptionHere*" imageUrl="https://m.media-amazon.com/images/M/MV5BZmZhNWMyODgtMzA0OC00NWFhLTllODQtYmJkZjYxYWU4MGU1XkEyXkFqcGdeQWFybm8@._V1_.jpg"/>
          <Posts username="Udbhav Naryani" caption="*InsertCoolCaptionHere*" imageUrl="https://m.media-amazon.com/images/M/MV5BZmZhNWMyODgtMzA0OC00NWFhLTllODQtYmJkZjYxYWU4MGU1XkEyXkFqcGdeQWFybm8@._V1_.jpg"/>
          <Posts username="Udbhav Naryani" caption="*InsertCoolCaptionHere*" imageUrl="https://m.media-amazon.com/images/M/MV5BZmZhNWMyODgtMzA0OC00NWFhLTllODQtYmJkZjYxYWU4MGU1XkEyXkFqcGdeQWFybm8@._V1_.jpg"/>
          
        </div>

       

    </div>
  );
}

export default App;
