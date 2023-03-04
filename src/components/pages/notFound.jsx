import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="blue"
    >
      <p
        style={{
          fontWeight: "bold",
          fontSize: "3em",
          marginBottom: "1em",
        }}
        className="blue"
      >
        OOPS
      </p>
      <p
        style={{
          fontWeight: "bold",
          fontSize: "5em",
          marginBottom: "1em",
        }}
        className = "blue"
      >
        Page not Found
      </p>
      <Link to = '/'>
      <button style={{
        width: 'auto',
        padding: '0.5em',
        
      }} >Go back to Home</button>
      </Link>
    </div>
  );
}
