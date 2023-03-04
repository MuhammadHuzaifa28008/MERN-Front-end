import "../styles/apiCard.css";

import { useState, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import Modal from "../modal/loginModal";

import UserContext from "../../Context/userContext/userContext";

import apiImg from "../PNGs/api.png";
import copyImg from "../PNGs/copy.png";
import addImg from "../PNGs/add.png";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiCrossMark } from "react-icons/gi";

export default function ApiCard(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("Need to login");
  const [isAlready, setIsAlready] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAlreadyAddedComp] = useState(
    props.isAlreadyAddedComp
  );

  const [api] = useState(props.Api);

  const { user } = useContext(UserContext);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(api.Link);
      // console.log("api is :" + api.Link);
      // console.log("before change: " + isCopied);
      setIsCopied(true);
      // console.log("after change: " + isCopied);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleAddToList = async () => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   // console.log(token);
    //   const payload = jwtDecode(token);
    //   // console.log(payload);
    //   let axiosConfig = {
    //     headers: {
    //         "token": token,
    //     }
    //   };

    //   await axios.post(`/free-apis/add/${payload.userId}?link=${api.Link}`,{}, axiosConfig)
    //   .then((res) => {
    //     if(res.data.success === false){
    //       if(res.data.isAlready === true){
    //         setIsAlready(true);

    //       }else{
    //         console.log(res.data.success +" : "+ res.data.message);
    //         setMessage(res.data.message);
    //         setIsVisible(true);
    //       }
    //     }
    //     else{
    //       console.log(res.data.success +" : "+ res.data.message);
    //       setIsAdded(true);
    //       setTimeout(()=> setIsAdded(false), 2000);
    //     }
    //   })
    //   .catch(err => console.log(err))

    // } else {
    //   console.log("you need to Login first");
    //   setIsVisible(true);
    // }

    // ---------------------------

    const token = localStorage.getItem("token");
    // console.log("apiCard :user we have \t"+ user);
    if (token) {
      // console.log("apiCard.jsx \n token -> true")
      if (user.loggedIn === true) {
        // console.log("apiCard.jsx \n user.loggedIn -> true")
        const axiosConfig = {
          headers: {
            token: token,
          },
        };
        axios
          .post(
            `/free-apis/add/${user.userData.userId}?link=${api.Link}`,
            {},
            axiosConfig
          )
          .then((res) => {
            // console.log("apiCard.jsx \n res ->" + res.data.message);
            if (!res.data.success) {
              // console.log("apiCard.jsx \n res.data.success -> failed")
              setIsVisible(true);
              setMessage(res.data.message);
              if (res.data.isAlready) {
                // console.log("apiCard.jsx \n res.data.isAlready -> true")
                setIsAlready(true);
              } else {
                console.log("apiCard \n  user.loggedIn = false");
                // console.log('res.data.message)
                user.loggedIn = false;
              }
            } else {
              // console.log("apiCard.jsx \n res.data.success -> true")
              setIsAdded(true);
              setTimeout(() => setIsAdded(false), 2000);
            }
          })
          .catch((err) => console.log("err:" + err));
      } else {
        // console.log("apiCard.jsx \n not loggedIn")
        setIsVisible(true);
      }
    } else {
      // console.log("apiCard.jsx \n no token")
      setIsVisible(true);
      // setMessage('user not Logged IN');
    }
  };

  const handleDeleteFromList = () => {
    // console.log("dalete from list");

    const token = localStorage.getItem("token");
    // console.log("apiCard :user we have \t"+ user);
    if (token) {
      // console.log("apiCard.jsx \n handle Delete\n token -> true")
      if (user.loggedIn === true) {
        // console.log("apiCard.jsx \n handle Delete\n user.loggedIn -> true")
        axios
            .delete(
              `/free-apis/delete/${user.userData.userId}?link=${api.Link}`,{
                headers: { token: token },
              }
            )
          .then((res) => {
            // console.log("apiCard.jsx \n handle Delete\n res ->" + res.data.message);
            if (!res.data.success) {
              // console.log("apiCard.jsx \n handle Delete\n res.data.success -> failed")
              setIsVisible(true);
              setMessage(res.data.message);
            } else {
              // console.log("apiCard.jsx \n handle Delete\n res.data.success -> true");
              // console.log(res.data.response);
              setIsDeleted(true);
              props.setUrls(res.data.response);
              // setTimeout(() => setIsDeleted(false), 2000);
            }
          })
          .catch((err) => console.log("err:" + err));
      } else {
        // console.log("apiCard.jsx \n handle Delete\n not loggedIn")
        setIsVisible(true);
      }
    } else {
      // console.log("apiCard.jsx \n handle Delete\n no token")
      setIsVisible(true);
      user.loggedIn = false;
      setMessage('user not Logged IN');
    }
  };

  return (
    <>
      <div id="x" className="apiCard" key={api.Description}>
        <div className="apiLogo">
          <img src={apiImg} alt="API" />
        </div>

        <div className="txtSec">
          <p className="blue">{api.API}</p>
          <span>{api.Description}</span>
        </div>

        <div id="y" className="apiActions">
          <div onClick={handleCopy}>
            {!isCopied && <img title = "copy" src={copyImg} alt="copy" />}
            {isCopied && <img title = "copied" src={addImg} alt="copied" />}
          </div>
          {!isAlreadyAddedComp && (
            <div onClick={handleAddToList}>
              {!isAdded && <img title = "add to list" src={addImg} alt="add" />}
              {isAdded && <img title = "added to list" src={copyImg} alt="add" />}
            </div>
          )}
          {isAlreadyAddedComp && (
            <div onClick={handleDeleteFromList}>
              {!isDeleted && (
                <MdOutlineDeleteOutline className="deleteIcon" color="white" />
              )}
              {isDeleted && <GiCrossMark className="deleteIcon" color="red" />}
            </div>
          )}
        </div>
        {/* {isCopied && <div className="copiedDiv">
          <span>copied</span>
          </div>} */}
      </div>
      {isVisible && (
        <div>
          <Modal
            redirect={false}
            isAlready={isAlready}
            message={message}
            closeModal={setIsVisible}
          />
        </div>
      )}
    </>
  );
}
