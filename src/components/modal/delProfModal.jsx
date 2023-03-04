import axios from "axios";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/userContext/userContext";

const DeleteProfileModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {}, []);

  return (
    <div
      onClick={() => {
        closeModal(false);
      }}
      className="modalContainer"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalCard"
      >
        <p
          style={{
            marginBottom: "0.5em",
            fontSize: "1.5em",
            fontWeight: "bolder",
          }}
          className="blue"
        >
          Want to delete account ?
        </p>
        {/* <div> */}
        <button
          onClick={async () => {
            const token = localStorage.getItem("token");
            await axios
              .delete(`/user/delete/${user.userData.userId}`, {
                headers: { token: token },
              })
              .then((res) => {
                if (res.data.success) {
                  console.log(res.data.message);
                  user.loggedIn = false;
                  user.userData = {};
                  navigate("/");
                } else {
                  closeModal(false);
                  console.log(res.data.message);
                }
              });
          }}
        >
          Yes
        </button>

        <button
          onClick={() => {
            closeModal(false);
          }}
        >
          No
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default DeleteProfileModal;
