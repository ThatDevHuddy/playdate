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
  if(user != null){
      cheese();
  }
  async function cheese(){
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      var ref = doc(db,'users', user.uid)
    await setDoc(ref, {
      name: user.displayName
    });
  // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  }

 
  return (
    <div  style={{"background-color":'green'}}>
        <h1>Sign In</h1>
        <button onClick={() => googleSignIn()}>Login with google 🥱</button>
      
    </div>
  )
}

export default Signin