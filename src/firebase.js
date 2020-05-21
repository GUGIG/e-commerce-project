import firebase from "firebase";
/*
according to the official document, in order to use firestore, you must manually require firestore as below.
..but why not just import it instead?
and, shouldn't firestore be already imported when firebase was imported in the first place, considering firestore is child directory of firebase???
*/
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyBMQwBmRXTs3Up-QNW_pAPIREmi6m8bnPU",
    authDomain: "vue-shop-150cc.firebaseapp.com",
    databaseURL: "https://vue-shop-150cc.firebaseio.com",
    projectId: "vue-shop-150cc",
    storageBucket: "vue-shop-150cc.appspot.com",
    messagingSenderId: "451722910361",
    appId: "1:451722910361:web:5c0be437bbb4deb2217608",
    measurementId: "G-TQXR768BL9"
  };

  // Initialize Firebase. 
  // fb contains app object. 
  // look at the document for more information about app object.
  const fb = firebase.initializeApp(firebaseConfig);
  
  // db contains db i guess.
  // look at the document for more information about this 'db' object.
  const db = firebase.firestore();

  // firebase.analytics(); this is for analytics.

  export {fb, db};