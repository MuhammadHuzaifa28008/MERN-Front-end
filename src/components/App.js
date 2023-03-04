import { useState, useEffect } from "react";
import "./styles/App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";

import UserContext from "../Context/userContext/userContext";
import ApiContext from "../Context/apiContext/apiContext";

import NavBar from "./navBar.jsx";
import Header from "./header";
import Loading from "./pages/loading";
import BasicRes from "./pages/basicRes";
import CategoryRes from "./pages/categoryRes";
import AddedApis from "./pages/addedApis";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import UserProfile from "./pages/userProfile";
import NotFound from "./pages/notFound";

export default function App() {
  // const [title,setTitle] = useState(`Apis Hub`);

  // const token = localStorage.getItem("token");
  
  const [apiRes, setApiRes] = useState(null);
  // let [user, setUser] = useState({});
  const [user] = useState({ loggedIn: false });
  
  // let currentPage = useLocation();
  
  useEffect(() => {
    document.title = "Apis Hub";

    const isUserAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // console.log("App.js \n token exists already");

        const payload = await jwtDecode(token);

        const userAlready = {
          userId: payload.userId,
          userName: payload.name,
          userEmail: payload.email,
        };

        let axiosConfig = {
          headers: {
            token: token,
          },
        };
        const res = await axios.get("/user/isUserAuth", axiosConfig);
        if (res.data.success === true) {
          // console.log("App.js \n user already loggedIn");
          user.userData = userAlready;
          user.loggedIn = true;
          // console.log(user);
        } else {
          user.loggedIn = false;
          // setUser(prev => prev.loggedIn = false);
          // console.log("App.js \n user not logged in");
          // console.log(user);
        }
      }
    };

    async function fetchData() {
      const response = await axios.get("/free-apis/");
      setApiRes(response.data.response);
    }

    isUserAuth();
    fetchData();
  }, []);
  // useEffect(()=>{

  // },[title])

  const homeHandle = () => {
    if (apiRes === null) {
      return (
        <div className="loadForHome">
          <Loading />
        </div>
      );
    } else {
      return (
        <UserContext.Provider value={{ user }}>
          <ApiContext.Provider value={apiRes.apis}>
            <div className="main">
              <div className="nav">
                <NavBar />
              </div>
              <div className="head">
                <Header />
              </div>
              <div className="pages">
                <Routes>
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<SignUp />} />
                  <Route
                    exact
                    path="/"
                    element={
                      <BasicRes
                        images={apiRes.urls}
                        categories={apiRes.categories}
                      />
                    }
                  />
                  <Route
                    path="/category/:category"
                    element={<CategoryRes apis={apiRes.apis} />}
                  />
                  <Route path="/addedapis" element={<AddedApis />} />
                  <Route path="/user" element={<UserProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </ApiContext.Provider>
        </UserContext.Provider>
      );
    }
  };

  return <>{homeHandle()}</>;
}
