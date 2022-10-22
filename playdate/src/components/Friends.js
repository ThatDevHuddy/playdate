import FriendList from './FriendList';
import FriendAvailability from './FriendAvailability';
import {useState,useEffect} from 'react';
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import {doc,getDoc,setDoc, collection, addDoc, getDocs, updateDoc, deleteDoc, query} from 'firebase/firestore';

const Friends = () => {
  const [user] = useAuthState(auth);
  const [friendUID, setFriendUID] = useState("");

    useEffect(() => {
      init();
    }, []);
  
    async function init(){

    }
    const handleInputChange = (e) =>{
      setFriendUID(e.target.value)
    }

    async function addFriend(){

      const reff = collection(db, "users");
      const querySnapshot = await getDocs(reff);
      let gotHere = false;
      querySnapshot.forEach((doc) => {
        if(friendUID == doc.id){
          chickenweenie();
          gotHere = true;
        }
        
      })
      if(gotHere == false){
        alert('invalid friend user id');

      }

      async function chickenweenie(){
      const ref = doc(db, "users", user.uid);
      const docSnap = await getDoc(ref);
      if(docSnap.get('friends') != null) {
        let friends = docSnap.get('friends')
        if(!friends.includes(friendUID)){
          friends.push(friendUID);
          await updateDoc(ref, {
            friends: friends
          });
        }
      }
      else{
        await updateDoc(ref, {
          friends: [friendUID]
        });
      }
      return true;
    }
    }
  
  return (
    <div>
        <input value = {friendUID} onChange = {handleInputChange}></input>
        <button onClick = {() => {addFriend()}}>Add Friend</button>
        <FriendList />
        <FriendAvailability />
    </div>
  )
}

export default Friends