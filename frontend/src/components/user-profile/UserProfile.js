// import "./AuthorProfile.css";
import "./userProfile.css";
// import "../dashboard/dashboard.css"
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetState } from "../../redux/slices/userLoginSlice";
import LogoHeader from "../home/LogoHeader";
function UserProfile() {
  let { currentUser } = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  function handleSignout() {
    // Perform signout logic here
    // For example, clearing local storage, resetting state, etc.
    // Redirect to home page
    sessionStorage.removeItem("token");
    dispatch(resetState());
    navigate("/");
  }
  return (
    
    <div className="user-profile container-fluid p-0 mx-auto">
            <div className="container-fluid mt-0">
            <LogoHeader />
            </div>
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`dashboard/${currentUser.username}`}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`budget/${currentUser.username}`}>
            Budget
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`expenses/${currentUser.username}`}>
            Expenses
          </NavLink>
        </li>
        <li>
          <button
            // id="signout-btn"
            className="btn btn-sm btn-danger signout-btn"
            onClick={handleSignout}
          >
            Sign Out
          </button>
        </li>
      </ul>
      <div >
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
