
const Friend = ({deets}) => {
  console.log(deets.availability[0].Sun);
    return (
      <div style={{float: 'right', width: '70%', height: '640px', overflow: 'scroll', scrollSnapType: 'y mandatory'}}>
         {deets.availability.map((week) => (
          
          <div style = {{border: '3px solid black', margin: '3px', scrollSnapAlign: 'center', scrollSnapStop: 'always'}}>
            <h2>{week.start}</h2>
            <Day dayy = {week.Sun} name = 'Sun' /> 
            <Day dayy = {week.Mon} name = 'Mon' /> 
            <Day dayy = {week.Tue} name = 'Tue' /> 
            <Day dayy = {week.Wed} name = 'Wed' /> 
            <Day dayy = {week.Thu} name = 'Thu' /> 
            <Day dayy = {week.Fri} name = 'Fri' /> 
            <Day dayy = {week.Sat} name = 'Sat' /> 
          </div>
         ))}
         
      </div>
    )
  }
  
  const Day = ({dayy, name}) => {
    console.log(dayy);
    return (
      <div>
        <h5>{name}</h5>
        {dayy.map((tf, index) => (
          <div style={{ display: 'inline-block', marginTop:'-20px'}}>
            
            {!tf && <div key={index} style={{ display: 'inline-block', 'backgroundColor': 'white', height: '30px', width: '22px', borderLeft: '1px solid black', borderRight: '1px solid black', borderTop: '2px solid black', borderBottom: '2px solid black'}}>
            </div>}
            {tf && <div key={index} style={{ display: 'inline-block', 'backgroundColor': 'green', height: '30px', width: '22px', borderLeft: '1px solid black', borderRight: '1px solid black', borderTop: '2px solid black', borderBottom: '2px solid black'}}>
            </div>}
          </div>
))}

      </div>
    )
  }

  export default Friend