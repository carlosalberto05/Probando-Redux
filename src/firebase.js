import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD6_9CSUrxNegvy8oMQ5lv4iJu1DDy0tl8",
    authDomain: "redux-ffbea.firebaseapp.com",
    databaseURL: "https://redux-ffbea.firebaseio.com",
    projectId: "redux-ffbea",
    storageBucket: "redux-ffbea.appspot.com",
    messagingSenderId: "356285698828",
    appId: "1:356285698828:web:98ac26f85ebf4cdec0ef29"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()

  export {auth, firebase, db, storage}