import { useEffect } from "react"
import "../styles/loading.css"

// import loadImg from "../PNGs/load.jpg"

export default function Loading(){
useEffect(()=>{
document.title = "Loading ..."
},[])

return(<>
<div className="loadImg">
    {/* <img src={loadImg} alt= "we regret !" /> */}

</div>
    <div className ="load"></div>
    {/* <h1>LOADING...</h1> */}
</>
)
}