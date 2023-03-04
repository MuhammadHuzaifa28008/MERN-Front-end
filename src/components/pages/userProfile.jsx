import "../styles/userProfile.css";

import axios from "axios";

import { useRef, useContext, useEffect, useState } from "react";

import Modal from "../modal/loginModal";
import DeleteProfileModal from "../modal/delProfModal";

import UserContext from "../../Context/userContext/userContext";

// import { GiPencil } from "react-icons/gi";
import pencil from "../PNGs/pencil.png";
import cancel from "../PNGs/cancel.png";
import passwordPng from "../PNGs/lock.png";

export default function UserProfile() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const oldPass = useRef(null);
  const newPass = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [changeName, setChangeName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePass, setChangePass] = useState(false);

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  let [errors, setErrors] = useState({});
  const [delProfModal, setDelProfModal] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    // .............................\
    if (user.loggedIn) {
      // console.log("user");
      // console.log(user);
    document.title = `Apis Hub | ${user.userData.userName}`;
      

      setUserName(user.userData.userName);
      setUserEmail(user.userData.userEmail);

      const token = localStorage.getItem("token");
      if (token) {
      } else {
        setIsVisible(true);
        user.loggedIn = false;
        // console.log("userProfile.jsx \n useEffect user not LOGGED IN X");
      }
    } else {
      document.title = "Apis Hub | User Profile";
      setIsVisible(true);
    }
  }, [user]);

  useEffect(() => {
    if (changeName || changeEmail || changePass) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [changeName, changeEmail, changePass]);

useEffect(() =>{
  if (user.loggedIn) {
    // console.log("user");
    // console.log(user);
    document.title = `Apis Hub | ${user.userData.userName}`;
  }
},[userName])

  const handleOnCancelUpdate = () => {
    if (changeName) {
      nameRef.current.innerText = userName;
      nameRef.current.contentEditable = false;
      setChangeName(false);
    }
    if (changeEmail) {
      emailRef.current.innerText = userEmail;
      emailRef.current.contentEditable = false;
      setChangeEmail(false);
    }
    if (changePass) {
      oldPass.current.className = "inputsLabel";
      setOldPassword(null);
      newPass.current.className = "inputsLabel";
      setNewPassword(null);
      setChangePass(false);
    }

    setErrors({});
  };

  const validation = () => {
    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!nameRef.current.innerText) {
      errors.userName = true;
      nameRef.current.innerText = "invalid NAME";
      // console.log("no userName");
    }
    if (!emailRegexp.test(emailRef.current.innerText) || !emailRef.current.innerText) {
      // console.log("no uerEmail");
      errors.userEmail = true;
      emailRef.current.innerText = "This is invalid Email";
    }

    if (oldPassword && newPassword) {
      if (oldPassword.length < 4) {
        // console.log("ivalid old password");
        errors.oldPassword = true;
        oldPass.current.className = "error";
        oldPass.current.value = "";
        oldPass.current.placeholder = "invalid Old Password";
      }
      if (newPassword.length < 4) {
        // console.log("ivalid new password");
        errors.newPassword = true;
        newPass.current.className = "error";
        newPass.current.value = "";
        newPass.current.placeholder = "invalid new password";
      }
    }
  };

  const handleUpdateProf = async () => {
    const token = localStorage.getItem("token");
    // setUserName(nameRef.current.innerText);
    // setUserEmail(emailRef.current.innerText);

    validation();

    if (Object.keys(errors).length > 0) {
      // console.log("contain client side errors \n unable to proceed for req");
      // console.log(errors)
      // setUserName(user.userData.userName);
      // setUserEmail(user.userData.userEmail);
    } else {
      // console.log(`email: "${emailRef.current.innerText}"`);
      // console.log(`Name: "${nameRef.current.innerText}"`);
      // console.log(`oldPassword: "${oldPassword}"`);
      // console.log(`newPassword: "${newPassword}"`);


      try {
        const res = await axios.patch(
          `/user/update/${user.userData.userId}`,
          {
            newEmail: emailRef.current.innerText.toLowerCase(),
            newName: nameRef.current.innerText,
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: { token: token }
          }
        );
        // console.log(res.data);
        if (res.data.success) {
          user.userData = res.data.user;
          setUserName(user.userData.userName);
          setUserEmail(user.userData.userEmail);
          handleOnCancelUpdate();
        }else{
          console.log(res.data)
          // setErrors(res.data.errors);
          errors = res.data.errors;

          if(errors.oldPassword){
            oldPass.current.className = "error";
            oldPass.current.value = null;
            oldPass.current.placeholder = `${errors.oldPassword}`;
          }
          if(errors.newPassword){
            newPass.current.className = "error";
            newPass.current.value = '';
            newPass.current.placeholder = `${errors.newPassword}`;
          }
        }
      } catch (err) {
        console.log(`err: ${err}`);
      }
    }
  };

  return (
    // <div>
    <>
      {user.loggedIn ? (
        <>
          <div className="profileCard">
            <div className="nameContainer">
              <p ref={nameRef} className="blue">
                {/* {user.userData.userName} */}
                {userName}
              </p>
              {!changeName ? (
                <div
                  className="userAction"
                  onClick={() => {
                    // console.log("change clicked for userName");
                    nameRef.current.contentEditable = true;
                    nameRef.current.focus();
                    // nameRef.current.style.direction = 'ltr';
                    setChangeName(true);

                    // setIsChanged(true);
                  }}
                >
                  <img className="pencil" src={pencil} alt="edit" />
                  {/* <GiPencil  className="blue"/> */}
                </div>
              ) : (
                <div
                  className="userAction"
                  onClick={() => {
                    // console.log("candel clicked for userName");
                    // setUserName(user.userData.userName);
                    nameRef.current.innerText = userName;
                    nameRef.current.contentEditable = false;
                    if(errors.userName){
                      delete errors.userName;
                    }
                    setChangeName(false);

                    // setIsChanged(false);
                  }}
                >
                  <img className="pencil" src={cancel} alt="cancel" />
                  {/* <GiPencil  className="blue"/> */}
                </div>
              )}
            </div>

            {/* -------------------------------------------------- */}

            <div className="emailContainer">
              <p ref={emailRef} className="blue">
                {userEmail}
              </p>
              {!changeEmail ? (
                <div
                  className="userAction"
                  onClick={() => {
                    // console.log("change clicked for userEmail");
                    emailRef.current.contentEditable = true;
                    setChangeEmail(true);
                    emailRef.current.focus();
                  }}
                >
                  <img className="pencil" src={pencil} alt="edit" />
                  {/* <GiPencil  className="blue"/> */}
                </div>
              ) : (
                <div
                  className="userAction"
                  onClick={() => {
                    // console.log("change canceled for userEmail");
                    // setUserEmail(user.userData.userEmail);
                    emailRef.current.innerText = userEmail;
                    emailRef.current.contentEditable = false;
                    if(errors.userEmail){
                      delete errors.userEmail;
                    }
                    setChangeEmail(false);
                  }}
                >
                  <img className="pencil" src={cancel} alt="cancel" />
                  {/* <GiPencil  className="blue"/> */}
                </div>
              )}
            </div>

            {/* ---------------------------------------------------------- */}

            <div className="passwordContainer">
              {!changePass ? (
                <>
                  <p className="blue">Change Password</p>
                  <div
                    className="userAction"
                    onClick={() => {
                      // console.log("change clicked for userPassword");
                      setChangePass(true);
                    }}
                  >
                    <img className="pencil" src={pencil} alt="edit" />
                    {/* <GiPencil  className="blue"/> */}
                  </div>
                </>
              ) : (
                <>
                  <form id="updateForm">
                    <label ref={oldPass} className="inputsLabel">
                      <img
                        className="inputUi"
                        src={passwordPng}
                        alt="oldPassword"
                      />
                      <input
                        className="loginInputs"
                        name="oldPassword"
                        type="password"
                        placeholder="Enter your old password"
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                          oldPass.current.className = "inputsLabel";
                          oldPass.current.placeholder =
                            "Enter  your old Pssword";
                            // console.log(oldPassword);
                            if(errors.oldPassword){
                              delete errors.oldPassword
                            }
                        }}
                      />
                    </label>

                    <label ref={newPass} className="inputsLabel">
                      <img
                        className="inputUi"
                        src={passwordPng}
                        alt="password"
                      />
                      <input
                        className="loginInputs"
                        name="newPassword"
                        type="password"
                        placeholder="Enter your new password"
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          newPass.current.className = "inputsLabel";
                          newPass.current.placeholder =
                            "Enter  your New Pssword";
                            if(errors.newPassword){
                              delete errors.newPassword
                            }
                        }}
                      />
                    </label>
                  </form>

                  <div
                    className="userAction"
                    onClick={() => {
                      // console.log("candel clicked for userPassword");
                      oldPass.current.className = "inputsLabel";
                      setOldPassword(null);
                      if(errors.oldPassword){
                        delete errors.oldPassword;
                      }
                      newPass.current.className = "inputsLabel";
                      setNewPassword(null);
                      setChangePass(false);
                      if(errors.newPassword){
                        delete errors.newPassword;
                      }
                    }}
                  >
                    <img className="pencil" src={cancel} alt="cancel" />
                    {/* <GiPencil  className="blue"/> */}
                  </div>
                </>
              )}
            </div>
            {isChanged ? (
              <div id="updateContainer">
                <button className="updateBtns" onClick={handleUpdateProf}>
                  Update Profile
                </button>
                <button className="updateBtns" onClick={handleOnCancelUpdate}>
                  cancel
                </button>
              </div>
            ) : (
              <></>
            )}
            <button id="actDel" onClick={() => setDelProfModal(true)}>
              Delete Account
            </button>
          </div>

          {delProfModal && (
            <div>
              <DeleteProfileModal closeModal={setDelProfModal} />
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="blue">User's profile will be displayed here !</h1>
        </>
      )}
      {isVisible && (
        <div>
          <Modal
            redirect={true}
            isAlready={false}
            message={"Need To Login First"}
            closeModal={setIsVisible}
          />
        </div>
      )}

      {/* </div> */}
    </>
  );
}
