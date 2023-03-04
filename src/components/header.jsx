import "./styles/header.css";

import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/userContext/userContext";

import LogoutModal from "./modal/logoutModal";

export default function Header() {
  let currentPage = useLocation();
  const { user } = useContext(UserContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // const [toRedirect, setToRedirect] = useState(false);
  const [isIn, setIsIn] = useState(false);
  const [viewMsg, setViewMsg] = useState(true);

  useEffect(() => {
    if (user.loggedIn === true) {
      // console.log('header says logged in')
      setIsIn(true);
    } else {
      // console.log('header says logged out')
      setIsIn(false);
    }

    setTimeout(() => setViewMsg(false), 5000);
  });

  return (
    <>
      {viewMsg && (
        <>
          <h6
            style={{
              color: "red",
              position: "absolute",
              left: "7em",
              top: "1em",
              fontSize: "20px",
              fontWeight: "1em",
            }}
          >
            Not Mobile Responsive | Bad UX |
          </h6>
          <h6
            style={{
              position: "absolute",
              left: "25em",
              top: "1em",
              fontSize: "20px",
              fontWeight: "1em",
            }}
            className="blue"
          >
            Time constraint | Under Graduate STUDENT 🙂
          </h6>
        </>
      )}
      <ul>
        {/* {!user.loggedIn && ( */}
        {!isIn && (
          <Link className="link" to="/login">
            <button
              className={`button ${
                currentPage.pathname === "/login" ? "activeButton" : ""
              }`}
            >
              Log In
            </button>
          </Link>
        )}

        {/* {user.loggedIn && ( */}
        {isIn && (
          <button
            onClick={() => {
              // console.log("logout clicked!");
              setIsModalVisible(true);
            }}
            className="button"
          >
            Log Out
          </button>
        )}
      </ul>

      {isModalVisible && (
        <div>
          <LogoutModal
            // redirect={toRedirect}
            closeModal={setIsModalVisible}
          />
        </div>
      )}
    </>
  );
}
