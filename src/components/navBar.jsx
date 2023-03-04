import "./styles/navBar.css";

// import menuLogo from "./PNGs/logo(inverted).png";
import menuLogo from "./SVGs/logo.svg";

import homeIcon from "./PNGs/home.png";
// import { GrHomeRounded } from "react-icons/gr";
import addedList from "./PNGs/addedList.png";
import user from "./PNGs/user.png";
// import menuBurger from "./PNGs/menu-burger.png";

import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  let currentPage = useLocation();

  return (
    <>
      <div className="navBar">
        <div title = 'Home' className="logo">
          <Link className="link" to="/">
            <img src={menuLogo} alt="logo" />
          </Link>
        </div>
        <ul>
          <li title="Home">
            <Link className="link" to="/">
              <img
                className={`menuItem ${
                  currentPage.pathname === "/" ? "active" : ""
                }`}
                src={homeIcon}
                // src={<GrHomeRounded />}
                alt="home"
              />
              {/* <GrHomeRounded /> */}
            </Link>
          </li>
          <li title="Added Apis">
            <Link className="link" to="/addedapis">
              <img
                className={`menuItem ${
                  currentPage.pathname === "/addedapis" ? "active" : ""
                }`}
                src={addedList}
                alt="collection"
              />
            </Link>
          </li>
          <li title="User Profile">
            <Link className="link" to="/user">
              <img
                className={`menuItem ${
                  currentPage.pathname === "/user" ? "active" : ""
                }`}
                src={user}
                alt="home"
              />
            </Link>
          </li>
        </ul>
        <div className="menuBurger">
          {/* <img className="menuItem" src={menuBurger} alt="menu" /> */}
        </div>
      </div>
    </>
  );
}
