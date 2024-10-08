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
                <h1 className="blue">Server was deployed on [https://adaptable.io] </h1>
                <h3 className="blue">Free tier has expired so 😭😭 no application demo till i figure out next free hosting service </h3>
                 <h6 className="blue">VISIT my github [https://github.com/MuhammadHuzaifa28008]</h6>
{/*             

                    </div> */}
            </>
            }
        <div className="load"></div>
    </>
    )
}
