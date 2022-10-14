import GroupFriendList from './GroupFriendList';
import Friend from './Friend';
import GroupAvailability from './GroupAvailability';

const Group = ({code}) => {
  return (
    <div>
      <h1>{code}</h1>
        <GroupFriendList />
        <Friend />
        <GroupAvailability />
    </div>
  )
}

export default Group