import './App.css';
import {useState} from 'react';
import SignInPage from './components/SignInPage'
import Group from './components/Group';
import MyAvailability from './components/MyAvailability'
import './NavigationBar.css';
import FriendGroupList from './components/FriendGroupList'
import Friends from './components/Friends'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase'
import {signOut} from 'firebase/auth';

function App() {
  const [signIn, setSignIn] = useState(true);
  const [group, setGroup] = useState(false); //define state
  const [myAvail, setMyAvail] = useState(false);
  const [friends, setFriends] = useState(false);

  const [user] = useAuthState(auth);
  
  const logOut = () => {
    signOut(auth)
    
    setFriends(false);
    setMyAvail(false);
    setGroup(false);
  }

  const goToGroups = () => {
    setGroup(true);
    setMyAvail(false);
    setFriends(false);

  }
  const goToFriends = () => {
    setFriends(true);
    setMyAvail(false);
    setGroup(false);

  }
  const goToMyAvail = () => {
    setMyAvail(true);
    setGroup(false);
    setFriends(false);

  }
  const signedIn = () => {
    
    goToGroups();
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
      {!user && <SignInPage done={signedIn}/>}
      {group && <FriendGroupList />}
      {myAvail && <MyAvailability />}
      {friends && <Friends />}
      
      
    </div>
  );
}

export default App;