
import Week from './Week';
import Day from './Day';
import {useState,useEffect} from 'react';
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import {doc,getDoc,setDoc} from 'firebase/firestore';

const MyAvailability = () => {
  const [user] = useAuthState(auth);
  const [selector, setSelector] = useState(true);
  const [myAvail, setMyAvail] = useState([])
  const setPaintAvailable = (e) => {
    setSelector(true);
    e.target.style.backgroundColor = '#00FF00';
  }

  const setPaintUnavailable = (e) => {
    console.log(myAvail);
    setSelector(false);
    e.target.style.backgroundColor = '#FF0000';
  }
  async function init(){
    console.log('here');
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.get('availability'))
    setMyAvail(docSnap.get('availability'));
    
  }
  
  
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
        <h1>Set Your Availibility</h1>
        <button onClick={setPaintUnavailable}>Paint Unavailable</button>
        <button onClick={setPaintAvailable}>Paint Available</button>
        <div>
        {myAvail.map((week) => (
       
              <Week selector = {selector} data = {week} />
             
            ))}
      <Week data = 'hi' selector = {selector}/>
      </div>
    </div>
  )
}

export default MyAvailability