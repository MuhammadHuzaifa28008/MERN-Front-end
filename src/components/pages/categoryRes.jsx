import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/categoryRes.css"

import ApiCard from "../cards/apiCard"

export default function CategoryRes(props){

    const [apis ] = useState(props.apis);

    const param = useParams();

    useEffect(()=>{
        document.title = `Apis Hub | ${param.category}`;
    },[])

     const mapApis = (api)=>{
        if(param.category === api.Category){
            return(
                <ApiCard Api={api} isAlreadyAddedComp={false}/>
            )
        }
     }

    return(
        <div className="response">
        <h1 className="blue"> {param.category} </h1>
        <div className="apis">
            {apis.map(mapApis)}
        </div>
        </div>
    )
}