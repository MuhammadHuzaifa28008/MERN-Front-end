import "../styles/modal.css";

import { useContext, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import UserContext from "../../Context/userContext/userContext";

export default function LogoutModal({ closeModal }) {
  const navigate = useNavigate();
  const currentPage = useLocation();
  const { user } = useContext(UserContext);

  useEffect(() => {

      console.log(currentPage);
    
  }, []);

  return (
    <div
      onClick={() => {
        closeModal(false);
      }}
      className="modalContainer"
    >
      <div onClick={(e) => {
         e.stopPropagation()
         }} className="modalCard">
        <p style = {{
          marginBottom: '0.5em',
          fontSize:'1.5em',
          fontWeight: 'bolder'
        }}  className="blue">Want to Log out ?</p>
        {/* <div> */}
          <button
            onClick={() => {
              localStorage.setItem("token", "");
              if(currentPage.pathname === '/addedapis' || currentPage.pathname === '/user'){
                navigate("/");
              }
              user.loggedIn = false;
              closeModal(false);
              console.log(user);
              // console.log(`"YES" Clicked!`)
            }}
          >
            Yes
          </button>

          <button
            onClick={() => {
              // console.log(`"NO" Clicked!`)
              closeModal(false);
            }}
          >
            No
          </button>
        {/* </div> */}
      </div>
    </div>
  );
}
