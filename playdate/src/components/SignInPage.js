import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebase'
import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
const Signin = ({ done }) => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
    
  }

 
  return (
    <div  style={{"background-color":'green'}}>
        <h1>Sign In</h1>
        <button onClick={() => googleSignIn()}>Login with google 🥱</button>
        {user && <button onClick = {done}>Done</button>}
    </div>
  )
}

export default Signin