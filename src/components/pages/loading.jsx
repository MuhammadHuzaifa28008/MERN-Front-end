import { useEffect, useState } from "react"
import "../styles/loading.css"

// import loadImg from "../PNGs/load.jpg"

export default function Loading() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        document.title = "APIs Hub | Loading ...";
        setTimeout(()=>setIsVisible(true), 5000)

    }, [])

    return (<>
        {isVisible && <>
            <div className="loadMsgContainer">
                <p className="blue">Server might be Sleeping 😴😴 | Gurbat cheekh cheekh k bol rhi hey 😭😭</p>
                <p className="blue">This might Take  __ mins 🙄🙄 | Please have some coffee ☕☕</p>
            </div>
            </>
            }
        <div className="load"></div>
    </>
    )
}