import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import Feed from "./Feed";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Login from "./Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import Widgets from "./Widgets";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <Header />
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          {/* Sidebar  */}
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
