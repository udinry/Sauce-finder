import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import logo from '././Images/logo.PNG';
import './App.css';
import { db, auth } from './firebase';
import Posts from './Posts';
import React from 'react';
import{ useEffect, useState } from "react";
import { Button } from '@material-ui/core';
import {Input} from '@material-ui/core'
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,

    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  
  
  const classes =  useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const[user, setUser]= useState(null);
  const[openSignIn, setOpenSignIn] = useState(false);
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
      
      if(authUser.displayName){

      }
      else{
        return authUser.updateProfile({
          displayname: username,
        });

      }
    }
      else{
        setUser(null);
      }
    })
  }, [user,username]);


  useEffect(()=>{
    db.collection('Posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc =>({
      id: doc.id,
      post: doc.data()
    })));
  })
  }, []);

  const signUp = (event) =>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
  }

  const signIn = (event) =>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error)=> alert(error.message))
    setOpenSignIn(false);

  }

  return (
    <div className="app">

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          > 
          <div style={modalStyle} className={classes.paper}>
          
          <form className="app__signup">
          <center>
          <div className="app__header">
          <img 
          className="app__headerImage"
          src={logo} alt=""
          />
          
          </div>
          </center>
          <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          <Input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Button type ='submit' onClick={signUp}>Sign Up</Button>
          </form>
          
          
          

    </div>
        
          
        </Modal>

        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
          > 
          <div style={modalStyle} className={classes.paper}>
          
          <form className="app__signup">
          <center>
          <div className="app__header">
          <img 
          className="app__headerImage"
          src={logo} alt=""
          />
          
          </div>
          </center>
          
          <Input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Button type ='submit' onClick={signIn}>Sign In</Button>
          </form>
          
          
          

    </div>
        
          
        </Modal>
        <div className="app__header">
          <img 
          className="app__headerImage"
          src={logo} alt=""
          />
          </div>
          {user ? (
          <Button onClick={() =>auth.signOut()}>Log Out</Button>
          ): (

            <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
          )}
          
          {
            posts.map(({id,post}) => (
              <Posts key={id}username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
          }
          <Posts username="Udbhav Naryani" caption="*InsertCoolCaptionHere*" imageUrl="https://m.media-amazon.com/images/M/MV5BZmZhNWMyODgtMzA0OC00NWFhLTllODQtYmJkZjYxYWU4MGU1XkEyXkFqcGdeQWFybm8@._V1_.jpg"/>
          <Posts username="Udbhav Naryani" caption="*InsertCoolCaptionHere*" imageUrl="https://m.media-amazon.com/images/M/MV5BZmZhNWMyODgtMzA0OC00NWFhLTllODQtYmJkZjYxYWU4MGU1XkEyXkFqcGdeQWFybm8@._V1_.jpg"/>
          <Posts username="Udbhav Naryani" caption="*InsertCoolCaptionHere*" imageUrl="https://m.media-amazon.com/images/M/MV5BZmZhNWMyODgtMzA0OC00NWFhLTllODQtYmJkZjYxYWU4MGU1XkEyXkFqcGdeQWFybm8@._V1_.jpg"/>
          
        

       

    </div>
  );
}

export default App;
