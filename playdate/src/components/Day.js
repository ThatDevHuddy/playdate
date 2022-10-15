import {useState} from 'react'

const Day = ({ selector }) => {
     let dayarray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
      const [mouseDown, setMouseDown] = useState(0);
   
    const toggleHour = (e, index) => {
        dayarray[index] = !dayarray[index];
        if(selector){
        e.target.style.backgroundColor = '#00FF00';
        }
        else{
        e.target.style.backgroundColor = '#FF0000';
        }
        console.log(dayarray[index])
    }
    
    
document.body.onmousedown = function() { 
    setMouseDown(1);
    console.log(mouseDown);
}
document.body.onmouseup = function() {
    setMouseDown(0)
     console.log(mouseDown);
}
    const Dragging = (e, index) => {
      console.log('enter')
      if(mouseDown == 1){
        console.log('here')
        dayarray[index] = !dayarray[index];
        
        if(selector){
          e.target.style.backgroundColor = '#00FF00';
          }
        if(!selector){
          e.target.style.backgroundColor = '#FF0000';
          }
      }
    }

  return (
    <div>
        {dayarray.map((productObject,index) => (
                <div style = {{display: 'inline-block'}}>
                    <div key={index} onMouseEnter={(e) => Dragging(e, index)} onMouseDown={(e) => toggleHour(e, index)} style={{display:'inline-block', 'backgroundColor': '#FF0000', height: '70px', width: '30px', border: '2px solid black', margin: '2px'}}>
                    </div>
                    <h3 style ={{'userSelect': 'none'}}>{(index/2)+7}</h3>

                </div>
            ))}
            
       {/*{dayarray.map(halfhour => <div onClick={toggleHour} style={{display:'inline-block', 'background-color': 'green', height: '70px', width: '30px', border: '2px solid black', margin: '1px'}}>kai</div>)}*/}
    </div>
  )
}

export default Day