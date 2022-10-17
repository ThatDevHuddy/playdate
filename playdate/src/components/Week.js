import Day from './Day'

const Week = ({data, selector}) => {
  return (
    <div style = {{margin:'2px', border:'2px solid black'}}>
      <h1>{data.start}</h1>
    <Day  selector = {selector} day = "Sun" place = {data.index}/>
    <Day  selector = {selector} day = "Mon" place = {data.index}/>
    <Day  selector = {selector} day = "Tue" place = {data.index}/>
    <Day  selector = {selector} day = "Wed" place = {data.index}/>
    <Day  selector = {selector} day = "Thu" place = {data.index}/>
    <Day  selector = {selector} day = "Fri" place = {data.index}/>
    <Day  selector = {selector} day = "Sat" place = {data.index}/>
    </div>
  )
}

export default Week