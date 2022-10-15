import Day from './Day'

const Week = ({data, selector}) => {
  return (
    <div style = {{margin:'2px', backgroundColor:'green'}}>
    <Day  selector = {selector}/>
  
    </div>
  )
}

export default Week