import React, {useContext} from "react";
import UserContext from "../../UserContext";

function Nav(props){
  const {userState, setUserState} = useContext(UserContext);

    function logOut(){
        fetch('/api/logout')
          .then(response => response.json())
          .then(data => {
            setUserState({...userState, loggedIn: false});
            console.log(data)
            props.history.push("/");
          });
    }
    return(
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark ">
        <a class="navbar-brand py-0 justify-content-end" id="scIcon" href="/profile">
          SC
        </a>
        {/* <button class="btn btn-success ml-auto mr-1 py-0">Always Show</button> */}
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse flex-grow-0 py-0"
          id="navbarSupportedContent"
        >
          {/* <div className="row justify-content-center">
            <div className="col-4">
            <a class=" nav-item nav-link" href="/friends">
                View Friends
              </a>
            </div>
            <div className="col-4">
              <a class="nav-item nav-link" href="/addfriend">
                Add Friends
              </a>
            </div>
            <div className="col-4">
              <a href="/" class="nav-item nav-link" onClick={logOut}>
                Logout
              </a>
            </div>
          </div> */}
          <ul class="navbar-nav text-right">
            <li class="nav-item active">
              <a class="nav-link" href="/friends">
                View Friends
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/addfriend">
                Add Friends
              </a>
            </li>
            <li class="nav-item active">
              <a href="/friend-requests" class="nav-link">
                Friend Requests
              </a>
            </li>
            <li class="nav-item active">
              <a href="/profile" class="nav-link">
                Profile
              </a>
            </li>
            <li class="nav-item active">
              <a href="" class="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Nav