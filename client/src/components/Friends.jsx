import React from "react";

const Friends = props => {
  // loop over the friends
  const nonFriends =[];
  console.log('users', props.users);
  console.log('friends', props.friends);
  console.log('localname', localStorage.name);
  for(let i=0; i<props.users.length; i++){
    let potentialFriend = true;
    for(let j=0; j<props.friends.length;j++){
      if(props.users[i].email_id === props.friends[j].email_id){
        console.log('found a friend');
        potentialFriend = false;
      } 
    }
    if (localStorage.name === props.users[i].email_id){
      console.log('found yourself');
      potentialFriend = false;
    }
    if(potentialFriend){
      nonFriends.push(props.users[i]);
    }
  }
  console.log('nonFriends', nonFriends);
  return (
    <div>
      <div>
        <select onChange={e => props.handleFriendToAddChange(e, nonFriends)}>
          <option>Select</option>
          {nonFriends.map((user, i) => {
            return (
              <option value={JSON.stringify(user)} key={i}>
                {user.name}
              </option>
            );
          })}
        </select>
        <input
          type="button"
          value="Add Friend"
          onClick={props.handleAddFriend}
        />
      </div>
      <div>
        {props.friends.map((elem, i) => (
          <div>
            <Friend friend={elem} key={i.toString()} />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

const Friend = props => {
  var { name, age, weight, height } = props.friend;
  return (
    <div className="friendsProfile">
      <span className="friendsData">
        <div className="friendEntry">Name: {name}</div>
        <div className="friendEntry">Age: {age}</div>
        <div className="friendEntry">Weight: {weight} lbs</div>
        {/* height is stored as a decimal in db so this line is used to turn in back into a foot/inches value */}
        <div className="friendEntry">
          Height:{" "}
          {Math.floor(height) +
            "'" +
            Math.floor((height - Math.floor(height)) * 12) +
            '"'}
        </div>
      </span>
    </div>
  );
};

export default Friends;
