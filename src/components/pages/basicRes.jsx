import "../styles/basicRes.css"

import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import CategoryCard from "../cards/categoryCard.jsx";
// import Loading from "./loading.jsx";


export default function BasicRes(props) {

    let [mainRes ] = useState(props.categories);
    let [imgUrls ] = useState(props.images)

    useEffect(()=>{
      document.title = "Apis Hub | Categories";
    },[])


    const handle = ()=>{
        return(
        <>
          <div className="response">
            <h1 className="blue">Categories</h1>
            <div className="categories">
              {mainRes.map(mapCategoryCards)}
            </div>
          </div>
       
        </> 
        )
      // }
    }
  
    const mapCategoryCards = (category, index)=>{
      const key = index+uuid();
      return(
        <Link to = {`/category/${category}`}>
          <CategoryCard categoryName = {category} image={imgUrls[index]} key = {key}/>
        </Link>
      )
    }

  return (
    <>
      {handle()}
    </>
  );
}
