import { useState, useEffect } from 'react';
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';


const Day = ({ selector, day, place }) => {
  const [user] = useAuthState(auth);
  const [dayArray, setDayArray] = useState([]);
  const toggleHour = (e, index) => {
    var temp = [...dayArray];
    temp[index] = selector;
    setDayArray(temp);
    dayChanged();

    console.log('selector' + selector)
    console.log(dayArray);
  }

  var mouseDown = 0;
  document.body.onmousedown = function () {
    mouseDown = 1;
    console.log(mouseDown);
  }
  document.body.onmouseup = function () {
    mouseDown = 0; console.log(mouseDown);
  }
  const Dragging = (e, index) => {
    console.log('enter')
    if (mouseDown == 1) {
      console.log('here')
      var temp = [...dayArray];
      temp[index] = selector;
      setDayArray(temp);
      dayChanged();

    }
  }

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log('here' + docSnap.get('availability')[place][day])
    setDayArray(docSnap.get('availability')[place][day]);

  }
  async function dayChanged() {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.get('availability'));
    let arr = docSnap.get('availability');
    arr[place][day] = dayArray;
    var ref = doc(db, 'users', user.uid)
    await updateDoc(ref, {
      availability: arr
    });
    console.log(docSnap.get('groups'));
    syncToGroups(docSnap.get('groups'),arr)
  }
  async function updateGroup(code,arr){
    console.log('update' + code)
    var ref = doc(db, 'groups', code,'users', user.uid)
        await updateDoc(ref, {
          availability: arr
        });
  }
  async function syncToGroups(groups,availArr){
    console.log(groups);
    const querySnapshot = await getDocs(collection(db, "groups"));
    querySnapshot.forEach((doc) => {
      if (groups.find(e => e.code == doc.id)) {
        updateGroup(doc.id,availArr);
      }
    console.log(doc.id);
    });/*
    const docRef = doc(db, "groups", user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.get('availability'));
    let arr = docSnap.get('availability');
    arr[place][day] = dayArray;
    var ref = doc(db, 'users', user.uid)
    await updateDoc(ref, {
      availability: arr
    });*/
  }
  return (
    <div>
      <h4>{day}</h4>
      {dayArray.map((tf, index) => (

        <div style={{ display: 'inline-block' }}>
          {!tf && <div key={index} onMouseEnter={(e) => Dragging(e, index)} onMouseDown={(e) => toggleHour(e, index)} style={{ display: 'inline-block', 'backgroundColor': 'white', height: '30px', width: '30px', border: '2px solid black', margin: '2px' }}>
          </div>}
          {tf && <div key={index} onMouseEnter={(e) => Dragging(e, index)} onMouseDown={(e) => toggleHour(e, index)} style={{ display: 'inline-block', 'backgroundColor': 'green', height: '30px', width: '30px', border: '2px solid black', margin: '2px' }}>
          </div>}

        </div>
      ))}

      {/*{dayarray.map(halfhour => <div onClick={toggleHour} style={{display:'inline-block', 'background-color': 'green', height: '70px', width: '30px', border: '2px solid black', margin: '1px'}}>kai</div>)}*/}
    </div>
  )
}

export default Day