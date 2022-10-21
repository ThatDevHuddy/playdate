import GroupFriendList from './GroupFriendList';
import Friend from './Friend';
import GroupAvailability from './GroupAvailability';
import {useState,useEffect} from 'react';
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import {doc,getDoc,setDoc, collection, addDoc, getDocs, updateDoc, deleteDoc} from 'firebase/firestore';

const Group = ({code}) => {
  const [user] = useAuthState(auth);
  const [friends, setFriends] = useState([]);
  const [title, setTitle] = useState('');
  const [showing, setShowing] = useState({});
  useEffect(() => {
    init();
  }, []);
  async function init(){
    const ref = collection(db, "groups", code, "users");
    const querySnapshot = await getDocs(ref);
    let temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({'name': doc.get('name'), 'uid':doc.get('uid'), availability: doc.get('availability')});
      
    console.log(doc.get('name'));
    });
    setFriends(temp);

    const reff = doc(db,'groups',code);
    const docSnap = await getDoc(reff);
    setTitle(docSnap.get('name'));
    
  }

  const showFriend = (friendDeets) =>{
    setShowing(friendDeets);
  }
  const showGroupAvail = () => {
    setShowing({});
  }


  return (
    <div>
      <h1>{title}</h1>
      <button onClick={showGroupAvail}>group availability</button>
        <GroupFriendList  friends = {friends} showFriend = {showFriend}/>
        {showing.name != null && <Friend deets = {showing}/>}
        {showing.name == null && <GroupAvailability code = {code} />}
    </div>
  )
}

export default Group