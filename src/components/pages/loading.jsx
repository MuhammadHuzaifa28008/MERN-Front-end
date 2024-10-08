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
{/*             <div className="loadMsgContainer"> */}
                <h1 className="blue">Server might be Sleeping 😴😴 | Gurbat cheekh cheekh k bol rhi hey 😭😭</h1>
                <h1 className="blue">This might Take more 5 secs 🙄🙄 | Please have some coffee ☕☕</h1>
{/*             </div> */}
            </>
            }
        <div className="load"></div>
    </>
    )
}
