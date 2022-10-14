import Day from './Day';
import {useState} from 'react';

const MyAvailability = () => {
  const [selector, setSelector] = useState(true);
  const setPaintAvailable = (e) => {
    setSelector(true);
    e.target.style.backgroundColor = '#00FF00';
  }

  const setPaintUnavailable = (e) => {
    setSelector(false);
    e.target.style.backgroundColor = '#FF0000';
  }

  return (
    <div>
        <h1>Set Your Availibility</h1>
        <button onClick={setPaintUnavailable}>Paint Unavailable</button>
        <button onClick={setPaintAvailable}>Paint Available</button>
        <Day selector={selector}/>
    </div>
  )
}

export default MyAvailability