import { useEffect } from "react"
import "../styles/loading.css"

// import loadImg from "../PNGs/load.jpg"

export default function Loading(){
useEffect(()=>{
document.title = "Loading ..."
},[])

return(<>
<div className="loadMsgContainer">
    <p className="blue">server might be Sleeping 😴😴 | Gurbat cheekh cheekh k bol rhi hey 😭😭</p>
<p className="blue">This might Take  __ mins 🙄🙄 | Please have some coffee ☕☕</p>
</div>
    <div className ="load"></div>
</>
)
}