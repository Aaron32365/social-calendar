import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import {isLoggedInCB, isLoggedIn} from "../../utils/isLoggedIn";

import "./EditProfile.css";

const EditProfile = (props) => {

  const {userState, setUserState} = useContext(UserContext);
  
  // state variables to edit
  const [name, setName] = useState(userState.name);
  const [bio, setBio] = useState(userState.bio);
  const [location, setLocation] = useState(userState.location);


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/logged-in", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        bio: bio,
        location: location,
      }),
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        props.history.push("/profile");
        setUserState({...userState, bio: bio, location: location, name: name })
      })
  }

  useEffect(() => {
    isLoggedIn(userState, setUserState, props) 
  }, []);

  useEffect(() => {
    setName(userState.name);
    setLocation(userState.location);
    setBio(userState.bio);
  }, [userState])


  console.log("name", name);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col box" id="EditContainer">
          <div className="col-fliud" id="EditHeader">
            Edit Profile
          </div>

          <div className="row justify-content-center" id="rowcss">
              <div className="col-12">
                <div className="row justify-content-center">
                <img id="profilepic" className="ml-0" src={userState.profilePic} />
                </div>
              </div>
              <br></br>
              <center>
                <p class="text-uppercase">
                  <small>
                    <h4>Username 
                      <br/>
                      {userState.username}</h4>
                  </small>
                </p>
                <a id="changeProfilePhoto" href="/editprofilepic">Change Profile Photo</a>
              </center>
          </div>
          <div className="col-12" id="FormContainer">
            
            <form className="col" action="" onSubmit={handleSubmit}>
              <div className="col labels">Change Name</div>
              <input className="col" placeholder="Type your Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <div className="col labels">Change Bio</div>
              <input
                className="col"
                placeholder="Type your Bio"
                value={bio}
                name="bio"
                onChange={(e => setBio(e.target.value))}
                type="textbox"
              />
               <div className="col labels">Change Location</div>
               <input
                className="col"
                placeholder="Type your Location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
              />
              <div className="row justify-content-center">
              <input type="submit" id="editProfileSaveBtn" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
