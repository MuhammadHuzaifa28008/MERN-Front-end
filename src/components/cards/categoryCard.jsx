import "../styles/categoryCard.css";

// import loading from "../pages/loading.jsx";

import altBg from "../PNGs/Alt.jpg";

import { useEffect, useState } from "react";

export default function CategoryCard(props) {
  const [img, setImg] = useState(props.image);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(()=>{
  //     // setImg(props.image);
  //     const preLoaderImage = new Image();
  //     preLoaderImage.src = props.image;
  //     preLoaderImage.onload = () => {
  //         setImg(props.image);
  //         setIsLoading(false);
  //       };
  //       preLoaderImage.onerror = () => {
  //         // Handle error here, such as setting the image to a default image
  //         setImg(altBg);
  //         setIsLoading(false);
  //       };

  // },[]);

  useEffect(() => {
    const loadImage = async () => {
      // setImg(props.image);
      const preLoaderImage = new Image();
      preLoaderImage.src = props.image;
      preLoaderImage.onload = () => {
        setImg(props.image);
        setIsLoading(false);
      };
      preLoaderImage.onerror = () => {
        // Handle error here, such as setting the image to a default image
        setImg(altBg);
        setIsLoading(false);
      };
    };

    loadImage();
  }, []);

  // --------------------------

  // if(isLoading){
  return (
    <div
      className="categoryCard"
      key={props.categoryName}
      onClick={() => {
        return <h1>{props.categoryName}</h1>;
      }}
    >
      <div className="categoryImg">
        {/* <p background-color = 'blue'> loading image </p> */}
        {isLoading ? (
          <img src={altBg} alt={altBg} />
        ) : (
          <img src={img} alt={altBg} />
        )}
        {/* <loading/> */}
      </div>
      <div>
        <span>{props.categoryName}</span>
      </div>
    </div>
  );
  // }
  // else{

  //     return(

  //         <div className="categoryCard" key={props.categoryName}
  //          onClick={()=> {
  //             return(<h1>{props.categoryName}</h1>)
  //         }}>
  //             <div className='categoryImg'>
  //             </div>
  //             <div>
  //             <span>{props.categoryName}</span>
  //             </div>
  //         </div>
  //     )
  // }
}
