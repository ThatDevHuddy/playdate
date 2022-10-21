import {useState,useEffect} from 'react';
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import {doc,getDoc,setDoc, collection, addDoc, getDocs, updateDoc, deleteDoc, query} from 'firebase/firestore';

const GroupAvailability = ({code}) => {
  const [addArray, setAddArray] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [name, setName] = useState('');
  const [user] = useAuthState(auth);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init(){
   
    const ref = collection(db, "groups", code, "events");
    const querySnapshot = await getDocs(ref);
    let temp = [];
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      let events = doc.get('events');
      events.forEach((event) => {
        temp.push({'name': event.name, 'date':event.date, hours: event.hours, people: event.people});
      })
     
      
    console.log(temp);
    setEventList(temp);
    });
   
  }
  const toggleHour = (index) => {
    var temp = [...addArray];
    temp[index] = !temp[index];
    setAddArray(temp);
  
  }
  const handleMonth = (e) => {
    setMonth(e.target.value);
  }
  const handleDay = (e) => {
    setDay(e.target.value);
  }
  const handleName = (e) => {
    setName(e.target.value);
  }
  
  async function addEvent(){
    //CHECK IF DATE AND MONTH FORMATTED CORRECLTY AND IF THAT NAME NOT ALR IN THERE
      let date = (month + ":" + day).toString();
      const docRef = doc(db, "groups", code,'events',date);
      const docSnap = await getDoc(docRef);
    
      if (!docSnap.exists()) {
        var ref = doc(db, "groups", code,'events',date)
        await setDoc(ref, {
          events: [{name:name,hours:addArray,people:[user.uid],date:date}]
        });
    }
    else{
      let temp = docSnap.get('events');
      temp.push({name:name,hours:addArray,people:[user.uid],date:date})
      var ref = doc(db, "groups", code,'events',date)
        await updateDoc(ref, {
          events: temp
        });
    }
  }
  async function joinGroup(date,name,index){
      const ref = doc(db, 'groups', code,'events',date);
      const docSnap = await getDoc(ref);
      const arr = docSnap.get('events');
    
      let obj = arr.find((o, i) => {
        if (o.name === name) {
          if(!arr[i].people.includes(user.uid)){
          arr[i].people.push(user.uid)
          console.log('joined')
          }
          else{
            const index = arr[i].people.indexOf(user.uid);
            if (index > -1) { // only splice array when item is found
              arr[i].people.splice(index, 1); // 2nd parameter means remove one item only
              console.log('left');
              
            }
          }
          
           return true;
        }
        
        
      
        
    });
    let temp = [...eventList];
    temp[index] = obj;
    setEventList(temp);
    await setDoc(ref, {
      events: arr
    });
  }
  return (
      <div style={{float: 'right', width: '70%', height: '100vh', 'overflowY': 'scroll'}}>
          <h3>Group Availability</h3>
          <div>
            <h3>add a event</h3>
            
            <form>
              <label>Month</label>
              <input type = 'text' value = {month} onChange = {handleMonth}></input>
              <label>Day</label>
              <input type = 'text' value = {day} onChange = {handleDay}></input>
              <label>Name</label>
              <input type = 'text' value = {name} onChange = {handleName}></input>
            
              {/*ADD COLOR LATER*/}
            </form>
            {addArray.map((tf, index) => (

              <div style={{ display: 'inline-block'}}>
                {!tf && <div key={index} onMouseDown={(e) => toggleHour(index)} style={{ display: 'inline-block', 'backgroundColor': 'white', height: '30px', width: '20px', border: '2px solid black', margin: '2px' }}>
                </div>}
                {tf && <div key={index} onMouseDown={(e) => toggleHour(index)} style={{ display: 'inline-block', 'backgroundColor': 'green', height: '30px', width: '20px', border: '2px solid black', margin: '2px' }}>
                </div>}

              </div>
              ))}
              <button onClick={addEvent}>Add</button>
              {eventList.map((tf, index) => (
                
                <div onClick = {() => joinGroup(tf.date,tf.name,index)}style={{ backgroundColor:'red', 'cursor': 'pointer', border: '2px solid black'}}>
                  {!tf.people.includes(user.uid) && 'Join ' + tf.name + ' on ' + tf.date}
                  {tf.people.includes(user.uid) && 'Leave ' + tf.name + ' on ' + tf.date}
                  </div>
                  
                  
                
                ))}
          </div>
      </div>
    )
  }
  
  export default GroupAvailability