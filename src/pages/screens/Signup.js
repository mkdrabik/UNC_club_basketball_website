import { useState, useRef, useEffect } from "react";
import { auth } from "../txtConfig";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Header from "../../components/Header";

import "../css/Account.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFN] = useState("");
  const [LastName, setLN] = useState("");
  const e = useRef("");
  const fn = useRef("");
  const ln = useRef("");
  const [user, setUser] = useState(false);

  //checks to see if a user is logged in
  useEffect(() => {
    if (auth.currentUser === null) {
      setUser(false);
    } else {
      setUser(true);
    }
  }, []);

  //creates new user
  const createNewUser = async (e) => {
    try {
      await createUserWithEmailAndPassword(auth, email, firstName + LastName);
      enablePersistence();
      setUser(true);
      alert("New user created and logged in");
      clear();
    } catch (err) {
      console.log(err);
      if (err.toString().includes("email-already-in-use")) {
        alert("Email already in use");
        return;
      } else if (err.toString().includes("invalid-email")) {
        alert("Please enter a valid email");
        return;
      } else {
        alert("User not created");
        return;
      }
    }
  };

  //logs user in
  const logUserIn = async (e) => {
    try {
      await signInWithEmailAndPassword(auth, email, firstName + LastName);
      enablePersistence();
      setUser(true);
      alert("Logged in");
      clear();
    } catch (err) {
      console.log(err);
      if (err.toString().includes("credential")) {
        alert(
          "Please ensure your email is correct and please type your name in the same way you typed it when you signed up."
        );
        alert("Email drabikmason12@gmail.com if you are still having trouble.");
      } else {
        alert("Error logging in");
        console.log(err);
      }
    }
  };
  //sets local storage persistence
  const enablePersistence = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      alert("Persistence not set!");
    }
  };

  return (
    <body className="acc-bg">
      <Header />
      <br />
      <br />
      <div className="row">
        {!user && (
          <button
            className="acc-si"
            onClick={(e) => {
              createNewUser();
            }}
          >
            Sign Up
          </button>
        )}
        {!user && (
          <button
            className="acc-si"
            onClick={(e) => {
              logUserIn();
            }}
          >
            Sign In
          </button>
        )}
      </div>
      <br />
      <br />
      <div className="acc-ovrl">
        {user && (
          <span>
            <Link to="/stats">
              <button className="acc-si">To Stats</button>
            </Link>
          </span>
        )}
        {!user && (
          <input
            placeholder="Email"
            className="su-input-box"
            type="text"
            ref={e}
            onChange={handleEmailChange}
          />
        )}
        <br />
        <br />
        {!user && (
          <input
            placeholder="First Name"
            className="su-input-box"
            type="text"
            ref={fn}
            onChange={handleFNChange}
          />
        )}
        <br />
        <br />
        {!user && (
          <input
            placeholder="Last Name"
            className="su-input-box"
            type="text"
            ref={ln}
            onChange={handleLNChange}
          />
        )}
        <br />
        <p className="warning">
          *Email is only used to ensure those wanting to view stats are not
          robots.
        </p>
        <p className="warning">
          *Your name is used to log you back in if you log out. Please ensure
          there are no extra spaces and the first letter is capital. If you
          still cannot get in email drabikmason12@gmail.com.
        </p>
      </div>
    </body>
  );

  //handles input changes
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleFNChange(e) {
    setFN(e.target.value);
  }
  function handleLNChange(e) {
    setLN(e.target.value);
  }

  //clears from
  function clear() {
    fn.current.value = "";
    ln.current.value = "";
    e.current.value = "";
  }
}

export default SignUp;
