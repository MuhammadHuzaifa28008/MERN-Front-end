import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ApiContext from "../../Context/apiContext/apiContext";
import UserContext from "../../Context/userContext/userContext";
import Modal from "../modal/loginModal";
import ApiCard from "../cards/apiCard";

const AddedApis = () => {
  const { user } = useContext(UserContext);
  const apis = useContext(ApiContext);

  const [isVisible, setIsVisible] = useState(false);
  const [urls, setUrls] = useState([]);
  // let urls = [];
  const [addedApis, setAddedApis] = useState([]);
  // const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    document.title = "Apis Hub | Added APIs";
    const fetchUrls = async (token) => {
      try {
        const res = await axios.get(
          `/free-apis/addedapis/${user.userData.userId}`,
          {
            headers: { token: token },
          }
        );
        if (res.data.apis) {
          // console.log("addedApis.jsx \n apis fetched " + res.data.apis.length);
          setUrls(res.data.apis);
          // return res.data.apis;
          // console.log("addedApis.jsx \n urls " + urls.length);
        }
      } catch (err) {
        // console.log("AddedApis.jsx \n req error " + err);
        setIsVisible(true);
        user.loggedIn = false;
      }
    };

    // ---------------
    // console.log("addedApis.jsx \n useEffect started\n \t apis -> " + apis.length");
    if (user.loggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        // console.log("addedApis.jsx \n useEffect user LOGGED IN");
        // setUrls(fetchUrls(token));
        fetchUrls(token);
        getFilteredApis();

        // console.log('adddedApis.jsx \n urls -> '+ urls.length);
      } else {
        setIsVisible(true);
        user.loggedIn = false;
        // console.log("addedApis.jsx \n useEffect user not LOGGED IN X");
      }
    } else {
      setIsVisible(true);
    }

    // console.log("addedApis.jsx \n useEffect finished");
  }, []);

  useEffect(() => {
    getFilteredApis();

    // console.log(urls);
  }, [urls, setUrls]);

  const getFilteredApis = async () => {
    // setAddedApis( apis.filter((api)=> urls.includes(api.Link)) );
    const filtered = await apis.filter((api) => urls.includes(api.Link));
    setAddedApis(filtered);
  };

  // const mapAddedApis = (api) => {
  //   if (urls.length > 0) {
  //     for (let url of urls) {
  //       if (url === api.Link) {
  //         //     // console.log('api found');
  //         return (
  //           <ApiCard
  //             Api={api}
  //             key={api.Link}
  //             isAlreadyAddedComp={true}
  //             setUrls={setUrls}
  //           />
  //         );
  //       }
  //     }
  //   }
  // };

  // const mapAddedApis = (api) => {
  //   if (urls.includes(api.Link)) {
  //     return (
  //       <ApiCard
  //         Api={api}
  //         key={api.Link}
  //         isAlreadyAddedComp={true}
  //         setUrls={setUrls}
  //       />
  //     );
  //   }
  // };

  const mapAddedApis = (api) => {
    return (
      <ApiCard
        Api={api}
        key={api.Link}
        isAlreadyAddedComp={true}
        setUrls={setUrls}
      />
    );
  };

  return (
    <>
      <React.StrictMode>
        {addedApis.length > 0 ? (
          <>
            <h1
              style={{
                display: "inline",
              }}
              className="blue"
            >
              Added Apis [ {addedApis.length} ]
            </h1>
            {/* <h6
              style={{
                color: "#ff5656",
                display: "inline",
                fontSize: "15px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  color: "red",
                  textTransform: "toUpperCase",
                }}
              >
                Bug
              </span>{" "}
              Lies Here 😔 | Oraginally Added Apis were
              <span
                style={{
                  fontSize: "20px",
                  color: "red",
                }}
              >
                {urls.length}
              </span>
              but
              <span
                style={{
                  fontSize: "20px",
                  color: "red",
                }}
              >
                {addedApis.length}
              </span>
              are being rendered.
            </h6> */}
            <div className="apis">{addedApis.map(mapAddedApis)}</div>
            {isVisible && (
              <div>
                <Modal
                  redirect={true}
                  isAlready={false}
                  message={"message here"}
                  closeModal={setIsVisible}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="blue">Added Apis will be displayed here !</h1>

            <div className="apis">
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
            </div>
          </>
        )}
      </React.StrictMode>
    </>
  );
};

export default AddedApis;
