import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCTMCURrbzVvkOPxgUBVUTu7n_FXit0Og0",
  authDomain: "projectmanagementsystem-6ed81.firebaseapp.com",
  projectId: "projectmanagementsystem-6ed81",
  storageBucket: "projectmanagementsystem-6ed81.appspot.com",
  messagingSenderId: "344418005295",
  appId: "1:344418005295:web:6d8f381236e4583d42b1da"
};
// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);

export default fire;
