import "../styles/login.css";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

import { useContext } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";


import emailPng from "../PNGs/envelope.png"
import passwordPng from "../PNGs/lock.png"


import UserContext from "../../Context/userContext/userContext.js";


export default function Login() {

const { user } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({});
// const currentPage = useLocation();
  let navigate = useNavigate();

  const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  useEffect(()=> {
    document.title = `Apis Hub | Log in`;
  },[])

  const handleLogin = async(event) => {
    event.preventDefault();
    validate();
    notify(errors);

    if (Object.keys(errors).length === 0) {
      await axios
        .post("/user/login", {
          email: userEmail,
          password: password,
        })
        .then((res) => {
        //  console.log(`Login res`);
        //  console.log(res);
          if(res.data.success === false){
            // console.log('server errors occured')
            notify(res.data.errors);
            setErrors({});
          }
          else{
            saveToken(res.data.token);
            
            // setUser(res.data.user);
            user.loggedIn = true;
            user.userData = res.data.user;
            // console.log('client log:'+ user.userData.userId);
            navigate(-1);
            reSet(event);
          }
        })
        // .catch((err) => console.log(err.response))
    } else {
      notify(errors);
      setErrors({});
    }
  }

    const validate = async () => {
      const EmptyErrorMsg = "Cannot Be Empty";

      if (!userEmail) {
        errors.userEmail = EmptyErrorMsg;
      } else {
        if (!emailRegexp.test(userEmail)) {
          errors.userEmail = "invalid Email";
        }
      }
      if (!password) {
        errors.password = EmptyErrorMsg;
      }
    }

    const notify = (errors)=>{

      if (Object.keys(errors).length > 0) {
  
        if (errors.userEmail) {
          document.getElementById("userEmail").className = "error";
          document.getElementsByClassName(
            "loginInputs"
          )[0].placeholder = `${errors.userEmail}`;
          document.getElementsByClassName("loginInputs")[0].value = "";
        }
  
        if (errors.password) {
          document.getElementById("password").className = "error";
          document.getElementsByClassName(
            "loginInputs"
          )[1].placeholder = `${errors.password}`;
          document.getElementsByClassName("loginInputs")[1].value = "";
        }
      }
  };

  const reSet = (event) => {

    event.target.userEmail.value = "";
    document.getElementsByClassName("loginInputs")[0].placeholder =
      "User Email";
    document.getElementById("userEmail").className = "inputsLabel";
    setUserEmail(null);

    event.target.password.value = "";
    document.getElementsByClassName("loginInputs")[1].placeholder =
      "Enter your Password";
    document.getElementById("password").className = "inputsLabel";
    setPassword(null);

    setErrors({});
  };

  const saveToken = (jwt) => {
    localStorage.setItem('token', jwt);
  }





  return (
    <>
      <div className="loginCard">
        <p className="logInGreetings">Log in</p>

        <form className="logInForm" onSubmit={handleLogin}>
          <label  id="userEmail"  className="inputsLabel">
            <img className="inputUi" src={emailPng} alt ="emil" />
          <input
            className="loginInputs"
            name="userEmail"
            type="text"
            placeholder="Enter your Email"
            onChange={(e) => {
              setUserEmail(e.target.value);
              document.getElementById("userEmail").className = "inputsLabel";
              document.getElementsByClassName("loginInputs")[0].placeholder =
                "User Email";
            }}
            />
            </label>
          <label id = "password" className="inputsLabel">
            <img className="inputUi" src={passwordPng} alt ="emil" />
          <input
            className="loginInputs"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
              document.getElementById("password").className = "inputsLabel";
              document.getElementsByClassName("loginInputs")[1].placeholder =
                "Enter your Pssword";
            }}
            />
            </label>
          <button className="submit" type="submit">Log in</button>
        </form>
        {/*  */}
            <p className="blue">
              Don't have an Account 
            </p>
        <Link className="link" to="/signup">
          <button>
            Sign Up
          </button>
        </Link>
      </div>
    </>
  );
}
