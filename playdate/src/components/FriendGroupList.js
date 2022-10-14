import {useState} from 'react';
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import {doc,getDoc,setDoc, collection, addDoc, updateDoc, deleteDoc} from 'firebase/firestore';
const FriendGroupList = () => {
  const[newGroupName, setNewGroupName] = useState("");
  const [joinGroupCode, setJoinGroupCode] = useState("");

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

  const [user] = useAuthState(auth);
  async function addGroup(){
    var newCode = makeid(3);
    alert('your share code is ' + newCode)
    var ref = doc(db,'groups', newCode)
    await setDoc(ref, {
      name: newGroupName,
      code: newCode
    });
    joinGroup(newCode);
  }

  async function joinGroup(code){
    var ref = doc(db,'groups', code, 'users',user.uid)
    await setDoc(ref, {
      name: user.displayName,
      uid: user.uid
    });
  }

  const handleTextChange = (e) =>{
    setNewGroupName(e.target.value)
  }
  const handleCodeChange = (e) =>{
    setJoinGroupCode(e.target.value)
  }
  return (
    <div>
        <ul>
            <li >FG 1</li>
            <li>FG 2</li>
        </ul>
       <form>
        <input value = {newGroupName} onChange = {handleTextChange} type = 'text'></input>
        </form>
        <button onClick = {addGroup}>+</button>

<div style = {{'backgroundColor':'red'}}>
        <form>
        <input value = {joinGroupCode} onChange = {handleCodeChange} type = 'text'></input>
        </form>
        <button onClick = {() => {joinGroup(joinGroupCode)}}>+</button>
        </div>
    </div>
  )
}

export default FriendGroupList