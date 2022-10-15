import {useState,useEffect} from 'react';
import {auth,db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import {doc,getDoc,setDoc, collection, addDoc, updateDoc, deleteDoc} from 'firebase/firestore';
const FriendGroupList = ({clickedGroup}) => {
  const[newGroupName, setNewGroupName] = useState("");
  const [joinGroupCode, setJoinGroupCode] = useState("");
  const [groupArray, setGroupArray] = useState([]);
  

  
  async function updateArr(){
    console.log('updating')
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.get('groups') != null){
    if(docSnap.get('groups').length > 0 && docSnap.get('groups') != groupArray){
      
    setGroupArray(docSnap.get('groups')); // do name
   
    }
  }
}
useEffect(() => {
  updateArr();
}, []);
 
 

// HOW TO DO SELECTING (INSIDE OF GROUPARRAY also get doc to get the name of group and store in dict and show that in the .map. when one of them clicked get the code of that one and call a function in app that updates a prop on group with the rigth code and then turns grouplist off and group on. group gets doc and shows the name or)
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
    }
    return result;
}

  const [user] = useAuthState(auth);
  async function addGroup(){
    var newCode = makeid(3);
    alert('your share code is ' + newCode)
    var ref = doc(db,'groups', newCode)
    await setDoc(ref, {
      name: newGroupName,
      code: newCode
    });
    joinGroup(newCode);
    updateArr();
  }

  async function joinGroup(code){
    const codes = doc(db, "groups", code);
    const codeSnap = await getDoc(codes);
    console.log(codeSnap.get('name'));
    if(codeSnap.exists()){
        var ref = doc(db,'groups', code, 'users',user.uid)
        await setDoc(ref, {
          name: user.displayName,
          uid: user.uid
        });

        //updating in user document
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

      console.log(docSnap.get('groups'));
      let arr = [];
      if(docSnap.get('groups') == null){
          arr.push({'code':code, 'name': codeSnap.get('name')});
      }
      else{
        arr = docSnap.get('groups');
        if(!docSnap.get('groups').includes(code)){
      
          arr.push({'code':code, 'name': codeSnap.get('name')});
        }
    
      }
      var ref = doc(db,'users', user.uid)
      await updateDoc(ref, {
        groups: arr
      });
      updateArr();
  }
  }

  const handleTextChange = (e) =>{
    setNewGroupName(e.target.value)
  }
  const handleCodeChange = (e) =>{
    setJoinGroupCode(e.target.value)
  }
  return (
    <div>
        {groupArray.map((group,index) => (
                <div onClick = {() => clickedGroup(group.code)}>
                    
                {group.name}
                </div>
            ))}
       <form>
        <input value = {newGroupName} onChange = {handleTextChange} type = 'text'></input>
        </form>
        <button onClick = {addGroup}>+</button>

<div style = {{'backgroundColor':'red'}}>
        <form>
        <input value = {joinGroupCode} onChange = {handleCodeChange} type = 'text'></input>
        </form>
        <button onClick = {() => {joinGroup(joinGroupCode)}}>+</button>
        </div>
    </div>
  )
}

export default FriendGroupList