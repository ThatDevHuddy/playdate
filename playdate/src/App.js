import './App.css';
import {useState} from 'react';
import SignInPage from './components/SignInPage'
import Group from './components/Group';
import MyAvailability from './components/MyAvailability'
import './NavigationBar.css';
import FriendGroupList from './components/FriendGroupList'
import Friends from './components/Friends'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth,db} from './firebase'
import {signOut} from 'firebase/auth';
import {doc,getDoc,setDoc} from 'firebase/firestore';

function App() {
  const [signIn, setSignIn] = useState(true);
  const [group, setGroup] = useState(false); //define state
  const [myAvail, setMyAvail] = useState(false);
  const [friends, setFriends] = useState(false);
  const [friendGroup, setFriendGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [user] = useAuthState(auth);
  
  if(user != null){
    init();
}
async function init(){
  console.log('here');
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

  const logOut = () => {
    signOut(auth)
    
    setFriends(false);
    setMyAvail(false);
    setGroup(false);
    setFriendGroup(false);
  }

  const goToGroups = () => {
    setGroup(true);
    setMyAvail(false);
    setFriends(false);
    setFriendGroup(false);
  }
  const goToFriends = () => {
    console.log(user);
    setFriends(true);
    setMyAvail(false);
    setGroup(false);
    setFriendGroup(false);
  }
  const goToMyAvail = () => {
    setMyAvail(true);
    setGroup(false);
    setFriends(false);
    setFriendGroup(false);
  }
  const clickedGroup = (code) =>{
    setMyAvail(false);
    setGroup(false);
    setFriends(false);
    setFriendGroup(true);

    setSelectedGroup(code)
  }
  
  return (
    
    <div className="App">
      {user && 
      <div className="navBar">
        <button onClick={goToGroups} className="groupsButton">Groups</button>
        <button onClick={goToFriends} className="friendsButton">Friends</button>
        <button onClick={goToMyAvail} className="myAvailButton">My Availability</button>
        <button onClick={logOut} className="signOutButton">Sign Out</button>
      </div>
}
      {!user && <SignInPage />}
      {group && <FriendGroupList turnedOn = {group} clickedGroup = {clickedGroup}/>}
      {myAvail && <MyAvailability />}
      {friends && <Friends />}
      {friendGroup && <Group code={selectedGroup}/>}
      
    </div>
  );
}

export default App;