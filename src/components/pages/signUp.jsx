import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../Context/userContext/userContext";

import emailPng from "../PNGs/envelope.png";
import passwordPng from "../PNGs/lock.png";
import userPng from "../PNGs/userName.png";

export default function SignUp() {

  const {user}  = useContext(UserContext);
  const currentPage = useLocation();

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  // const emailRef = useRef(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errors, setErrors] = useState({});
  // const [res, setRes] = useState({});

  let navigate = useNavigate();

  useEffect(()=>{
    document.title = 'Apis Hub | Sign Up'
  })

  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const handleSignUp = async (event) => {
    event.preventDefault();

    validate();
    notify(errors);

    if (Object.keys(errors).length === 0) {
      await axios
        .post("/user/signup", {
          email: userEmail,
          name: userName,
          password: password,
          passwordConfirmation: confirmPassword,
        })
        .then((res) => {
          if (res.data.success === false) {
            // console.log("server errors occured");
            notify(res.data.errors);
            setErrors({});
          } else {
            saveToken(res.data.token);
            navigate("/");
            reSet(event);
            user.loggedIn = true;
            user.userData = res.data.user;
          }
        })
        // .then(() => {
        //   reSet(event);
        // })
        .catch((err) =>
        console.log(err.response.errors)
        );
      } else {
      notify(errors);
      setErrors({});
    }
  };
  const validate = async () => {
    const EmptyErrorMsg = "Cannot Be Empty";

    if (!userName) {
      errors.userName = EmptyErrorMsg;
    }
    if (!userEmail) {
      errors.userEmail = EmptyErrorMsg;
    } else {
      if (!emailRegexp.test(userEmail)) {
        errors.userEmail = "invalid Email";
      }
    }
    if (!password) {
      errors.password = EmptyErrorMsg;
    } else {
      if (password.length < 4) {
        errors.password = `Atlease 4 characters, its [${password.length}]`;
      }
      if (confirmPassword) {
        if (password !== confirmPassword) {
          errors.confirmPassword = "incorrect password";
        }
      }
    }
    if (!confirmPassword) {
      errors.confirmPassword = EmptyErrorMsg;
    }
  };

  const notify = (errors) => {
    if (Object.keys(errors).length > 0) {
      if (errors.userName) {
        document.getElementById("userName").className = "error";
        document.getElementsByClassName(
          "loginInputs"
        )[0].placeholder = `${errors.userName}`;
        document.getElementsByClassName("loginInputs")[0].value = "";
      }

      if (errors.userEmail) {
        document.getElementById("userEmail").className = "error";
        document.getElementsByClassName(
          "loginInputs"
        )[1].placeholder = `${errors.userEmail}`;
        document.getElementsByClassName("loginInputs")[1].value = "";
      }

      if (errors.password) {
        document.getElementById("password").className = "error";
        document.getElementsByClassName(
          "loginInputs"
        )[2].placeholder = `${errors.password}`;
        document.getElementsByClassName("loginInputs")[2].value = "";
      }

      if (errors.confirmPassword) {
        document.getElementById("confirmPassword").className = "error";
        document.getElementsByClassName(
          "loginInputs"
        )[3].placeholder = `${errors.confirmPassword}`;
        document.getElementsByClassName("loginInputs")[3].value = "";
      }
    } else {
      // console.log("valid inputs");
    }
  };

  const reSet = (event) => {
    event.target.userName.value = "";
    document.getElementsByClassName("loginInputs")[0].placeholder = "User Name";
    document.getElementById("userName").className = "inputsLabel";
    setUserName(null);

    event.target.userEmail.value = "";
    document.getElementsByClassName("loginInputs")[1].placeholder =
      "User Email";
    document.getElementById("userEmail").className = "inputsLabel";
    setUserEmail(null);

    event.target.password.value = "";
    document.getElementsByClassName("loginInputs")[2].placeholder =
      "Password [4 Characters]";
    document.getElementById("password").className = "inputsLabel";
    setPassword(null);

    event.target.confirmPassword.value = "";
    document.getElementsByClassName("loginInputs")[3].placeholder =
      "same as Password";
    document.getElementById("confirmPassword").className = "inputsLabel";
    setConfirmPassword(null);

    setErrors({});
  };

  const saveToken = (jwt) => {
    localStorage.setItem("token", jwt);
  };

  return (
    <>
      <div className="loginCard">
        <p className="logInGreetings">Sign Up</p>

        <form className="logInForm" onSubmit={handleSignUp}>
          <label id="userName" className="inputsLabel">
            <img className="inputUi" src={userPng} alt="userName" />
            <input
              className="loginInputs"
              name="userName"
              type="text"
              placeholder="User Name"
              onChange={(e) => {
                setUserName(e.target.value);
                document.getElementById("userName").className = "inputsLabel";
                document.getElementsByClassName("loginInputs")[0].placeholder =
                  "User Name";
              }}
            />
          </label>
          <label id="userEmail" className="inputsLabel">
            <img className="inputUi" src={emailPng} alt="email" />
            <input
              className="loginInputs"
              name="userEmail"
              type="text"
              placeholder="Email [example@example.com]"
              onChange={(e) => {
                setUserEmail(e.target.value);
                document.getElementById("userEmail").className = "inputsLabel";
                document.getElementsByClassName("loginInputs")[1].placeholder =
                  "User Email";
              }}
            />
          </label>
          <label id="password" className="inputsLabel">
            <img className="inputUi" src={passwordPng} alt="password" />
            <input
              className="loginInputs"
              name="password"
              type="password"
              placeholder="Password [4 Characters]"
              onChange={(e) => {
                setPassword(e.target.value);
                document.getElementById("password").className = "inputsLabel";
                document.getElementsByClassName("loginInputs")[2].placeholder =
                  "Password [4 Characters]";
              }}
            />
          </label>
          <label id="confirmPassword" className="inputsLabel">
            <img className="inputUi" src={passwordPng} alt="confirm" />
            <input
              className="loginInputs"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                document.getElementById("confirmPassword").className =
                  "inputsLabel";
                document.getElementsByClassName("loginInputs")[3].placeholder =
                  "Confirm Password";
              }}
            />
          </label>
          <button className="submit" type="submit">
            Sign Up
          </button>
        </form>

        <p>Already have an Account</p>
        <Link className="link" to="/login">
          <button>Log in</button>
        </Link>
      </div>
    </>
  );
}
