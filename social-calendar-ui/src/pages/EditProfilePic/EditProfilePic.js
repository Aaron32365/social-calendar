import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import { isLoggedInCB, isLoggedIn } from "../../utils/isLoggedIn";
import "./EditProfilePic.css";

const EditProfilePic = (props) => {
  const { userState, setUserState } = useContext(UserContext);
  // state variables to edit
  const [name, setName] = useState(userState.name);
  const [bio, setBio] = useState(userState.bio);
  const [location, setLocation] = useState(userState.location);
  const [profilePic, setprofilePic] = useState(userState.profilePic);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/logged-in", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        bio: bio,
        location: location,
        profilePic: profilePic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.history.push("/profile");
        setUserState({
          ...userState,
          bio: bio,
          location: location,
          name: name,
          profilePic: profilePic,
        });
      });
  };

  useEffect(() => {
    isLoggedIn(userState, setUserState, props);
  }, []);

  useEffect(() => {
    setName(userState.name);
    setLocation(userState.location);
    setBio(userState.bio);
    setprofilePic(userState.profilePic);
  }, [userState]);

  console.log("name", name, "profilePic", profilePic);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col" id="EditContainer">
          <div className="col-fliud" id="EditHeader">
            Edit Profile Picture
          </div>

          <div className="row justify-content-center">
            <div class="row" id="rowcss">
              <img src={require("./images/guy.png")} id="profilepic" />
              <img src={require("./images/girl1.png")} id="profilepic" />
              <img src={require("./images/guy2.png")} id="profilepic" />
            </div>
            {/* 
            RADIO BUTTON IF NEEDED 

            <div class="row" id="rowcss">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                checked
              />
            </div> */}
            <div class="row" id="rowcss">
              <img src={require("./images/girl2.png")} id="profilepic" />
              <img src={require("./images/girl3.png")} id="profilepic" />
              <img src={require("./images/bluemonster.jpg")} id="profilepic" />
            </div>

            <div class="row" id="rowcss">
              <img
                src={require("./images/orangemonster.jpg")}
                id="profilepic"
              />
              <img src={require("./images/flower.jpeg")} id="profilepic" />
              <img src={require("./images/dog.jpg")} id="profilepic" />
            </div>
          </div>

          <div className="row justify-content-center">
            <Link className="col-9" id="SignupLink" to="/editprofile">
              {/*have an onclick event that runs a function that sends img to user model*/}
              Save
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfilePic;
