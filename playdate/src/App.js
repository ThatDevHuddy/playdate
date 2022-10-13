import './App.css';
import {useState} from 'react';
import SignInPage from './components/SignInPage'
import Group from './components/Group';
import MyAvailability from './components/MyAvailability'
import './NavigationBar.css';
import FriendGroupList from './components/FriendGroupList'
import Friends from './components/Friends'


function App() {
  const [signIn, setSignIn] = useState(false);
  const [group, setGroup] = useState(false); //define state
  const [myAvail, setMyAvail] = useState(false);
  const [friends, setFriends] = useState(false);

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
  const goToSignOut = () => {
    //SIGN OUT STUFF
  }

  return (
    
    <div className="App">

      <div className="navBar">
        <button onClick={goToGroups} className="groupsButton">Groups</button>
        <button onClick={goToFriends} className="friendsButton">Friends</button>
        <button onClick={goToMyAvail} className="myAvailButton">My Availability</button>
        <button onClick={goToSignOut} className="signOutButton">Sign Out</button>
      </div>

      {signIn && <SignInPage />}
      {group && <FriendGroupList />}
      {myAvail && <MyAvailability />}
      {friends && <Friends />}
      
      
    </div>
  );
}

export default App;