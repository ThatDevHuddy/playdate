import {db} from '../firebase.js';
import {doc,getDoc,setDoc, collection, addDoc, updateDoc, deleteDoc} from 'firebase/firestore';
const FriendGroupList = () => {
  async function adding(){
    var ref = doc(db,'groups', 'fg1')
    await setDoc(ref, {
      name:'balls'
    });
  }
  return (
    <div>
        <ul>
            <li onClick = {adding}>FG 1</li>
            <li>FG 2</li>
        </ul>
    </div>
  )
}

export default FriendGroupList