import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBnU_s686TeDQoBzYQNmtYb9bGRpNknt1U",
    authDomain: "sauce-app-43371.firebaseapp.com",
    projectId: "sauce-app-43371",
    storageBucket: "sauce-app-43371.appspot.com",
    messagingSenderId: "30592381048",
    appId: "1:30592381048:web:99296d949014b51dfa3d8d",
    measurementId: "G-D7DNE66X6E"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};