import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";

import HeaderOptions from "./HeaderOptions";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
function Header() {
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  const user = useSelector(selectUser);

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
          alt=""
        />
        <div className="header__search">
          <SearchIcon />
          <input type="text" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOptions Icon={HomeIcon} title="Home" />
        <HeaderOptions Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOptions Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOptions Icon={MessageIcon} title="Messaging" />

        <HeaderOptions Icon={NotificationsIcon} title="Notifications" />

        <div onClick={logoutOfApp}>
          <HeaderOptions
            title={user?.displayName || "me"}
            onClick={logoutOfApp}
            avatar="true"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
