import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyDXmyBa5xaVEHurg-HRFFfJb-hIOohH6bY",
    authDomain: "myslackapp-fca72.firebaseapp.com",
    projectId: "myslackapp-fca72",
    storageBucket: "myslackapp-fca72.appspot.com",
    messagingSenderId: "1005862862937",
    appId: "1:1005862862937:web:55c6be2e6a32c28b433148",
    measurementId: "G-T6FH3YEV3H"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;