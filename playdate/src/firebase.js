import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCD5V6t2fLoKLuNIo74_V9HvnL1ifFJt4",
  authDomain: "playdate-bf84b.firebaseapp.com",
  projectId: "playdate-bf84b",
  storageBucket: "playdate-bf84b.appspot.com",
  messagingSenderId: "179705194981",
  appId: "1:179705194981:web:268e838ad6ac699ee6a70c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);