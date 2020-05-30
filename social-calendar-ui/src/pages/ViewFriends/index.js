import React, {useState, useEffect} from "react";
import "./style.css";

export default function ViewFriends() {

  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    console.log("clicked the list group");
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked the Button");
  }

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  }


  // want to load the friends on mount
  useEffect(() => {
    fetch('/api/friends')
      .then(response => response.json())
      .then(data => {
        if (data.msg === "Please Login") {
          console.log("login");
        } else {
          // data will be an array of objects
          setFriends(data)
        }
      })
  }, []);

  const friendsList = ['Bob', 'Joe', 'Roger', 'Bill', 'Steve', 'Derek']
  

  return (
    <div className="body">
      
      <form id="search-friend-list-form" onSubmit={e => {return e.preventDefault()}}>
          
          <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
          </svg>
          <label htmlFor="search-friend-list">Search</label>
          <input type="text" onChange={handleChange} placeholder="Search" id="search-friend-list" name="search"/>
      </form>
      
      {/* holds the contacts */}
      <div className="friend-container">
        
        <ul className="list-group">
          {/* for production */}
          {/* {friends.map((friend, index) => {
            if (search === "") {
              return <li key={friend._id} className="list-group-item">{friend.username}</li>
            }
            if (friend.username.toLowerCase().startsWith(search)) {
              return <li key={friend._id} className="list-group-item">{friend.username}</li>
            }
          })} */}


          {friendsList.map((friend, index) => {
            if (search === "") {
              return <li className="list-group-item">{friend}</li>
            } else {
              if (friend.toLowerCase().startsWith(search)) {
                return <li className="list-group-item">{friend}</li>
              }
            } 
          })}
        </ul>
      </div>

     
      <div className="bottom-container">
        <button className="btn btn-primary">Add Friends</button>
      </div>
    
    </div>
    
  )
}