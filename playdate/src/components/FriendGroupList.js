import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import {doc,getDoc,setDoc, collection, addDoc, updateDoc, deleteDoc} from 'firebase/firestore';
const FriendGroupList = () => {
  const [user] = useAuthState(auth);
  async function addGroup(){
    var ref = doc(db,'groups', 'code')
    await setDoc(ref, {
      name:'balls',
      code: 'code'
    });
    joinGroup();
  }

  async function joinGroup(){
    var ref = doc(db,'groups', 'code', 'users',user.uid)
    await setDoc(ref, {
      user: user.displayName,
      uid: user.uid
    });
  }
  return (
    <div>
        <ul>
            <li onClick = {addGroup}>FG 1</li>
            <li>FG 2</li>
        </ul>
    </div>
  )
}

export default FriendGroupList