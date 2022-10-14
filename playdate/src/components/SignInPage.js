import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth,db} from '../firebase'
import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {doc,getDoc,setDoc, collection, addDoc, updateDoc, deleteDoc} from 'firebase/firestore';
const Signin = ({ done }) => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
    
  }
 

 
  return (
    <div style={{'backgroundColor':'green', height: '100vh', width: '100%'}}>
        <h1>Sign In</h1>
        <button onClick={() => googleSignIn()}>Login With Google</button>
      
    </div>
  )
}

export default Signin