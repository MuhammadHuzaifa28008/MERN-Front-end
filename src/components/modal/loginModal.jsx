import "../styles/modal.css";

import { Link, useNavigate } from "react-router-dom";

export default function Modal({ redirect, isAlready, message, closeModal }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        closeModal(false);
        if (redirect === true) {
          navigate(-1);
        }
      }}
      className="modalContainer"
    >
      <div onClick={(e) => e.stopPropagation()} className="modalCard">
        <p style = {{
          marginBottom: '0.5em',
          fontSize:'1.5em',
          fontWeight: 'bolder'
        }}  className="blue"> {message} </p>
        {!isAlready && (
          <div>
            <Link className="link" to="/login">
              <button>Login</button>
            </Link>
            <button
              onClick={() => {
                if (redirect === true) {
                  navigate(-1);
                }
                closeModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
        {isAlready && (
          <div>
            <button onClick={() => closeModal(false)}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
}
