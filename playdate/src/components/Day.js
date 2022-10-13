const Day = () => {
    let dayarray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    const toggleHour = (e, index) => {
        dayarray[index] = !dayarray[index];
        if(dayarray[index]){
        e.target.style.backgroundColor = '#00FF00';
        }
        else{
        e.target.style.backgroundColor = '#FFFFFF';
        }
        console.log(dayarray[index])
    }

  return (
    <div>
        {dayarray.map((productObject,index) => (
                <div style = {{display: 'inline-block'}}>
                    <div key={index} onClick={(e) => toggleHour(e, index)} style={{display:'inline-block', 'backgroundColor': '#FFFFFF', height: '70px', width: '30px', border: '2px solid black', margin: '2px'}}>
                    </div>
                    <h3>{index/2}</h3>

                </div>
            ))}
            
       {/*{dayarray.map(halfhour => <div onClick={toggleHour} style={{display:'inline-block', 'background-color': 'green', height: '70px', width: '30px', border: '2px solid black', margin: '1px'}}>kai</div>)}*/}
    </div>
  )
}

export default Day