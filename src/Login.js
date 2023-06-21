import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
 
  const register = () => {
    if (!name) {
      return alert("Please enter your name");
    }
    if (!email) {
      return alert("Please enter your email");
    }
    if (!password) {
      return alert("Please enter your password");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            dispatch(
              login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: name,
                photoURL: photoURL,
              })
            );
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          });
      })

      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(
          login({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            displayName: userCredential.user.name,
            photoURL: userCredential.user.photoURL,
          })
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <div className="login">
      <div className="form__container">
        <div className="form">
          <h1>Sign In</h1>
          <p>Stay updated on your professional world</p>

          <form>
            <input
              className="login__input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Fullname (reqired if registering)"
            />
            <input
              className="login__input"
              onChange={(e) => {
                setphotoURL(e.target.value);
              }}
              value={photoURL}
              type="text"
              placeholder="Profile Pic Url (optional)"
            />
            <input
              className="login__input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email"
            />
            <input
              className="login__input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              placeholder="Password"
            />
            <button type="submit" onClick={loginToApp}>
              Sign In
            </button>
          </form>
          <div className="register__Link">
            <span>New to LinkedIn?</span>
            <span className="registerLink" onClick={register}>
              Register Now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
