// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnmzsdldSeE32AnG9DDLHx2yiOWb6ZaTk",
  authDomain: "horariosauth.firebaseapp.com",
  projectId: "horariosauth",
  storageBucket: "horariosauth.appspot.com",
  messagingSenderId: "167137351439",
  appId: "1:167137351439:web:40e67e9355028a66f5107a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
