const GroupFriendList = ({friends, showFriend}) => {
  console.log(friends);

    return (
      <div style={{"backgroundColor":'red', float: "left", width: '30%', height: '100vh', 'overflowY': 'scroll'}}>
          <h1>Friend Groups</h1>
          {friends.map((friend,index) => (
                <div style={{'cursor': 'pointer'}} onClick={() => showFriend(friend)}>
                    
                {friend.name}
                </div>
            ))}
      </div>
    )
  }
  
  export default GroupFriendList