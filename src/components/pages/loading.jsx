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
                <div style={{ textAlign: 'center', padding: '20px' }}>
  <h1 style={{ color: 'blue', marginBottom: '10px' }}>
    Server was deployed on 
    <a href="https://adaptable.io" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'none', marginLeft: '5px' }}>
      Adaptable.io
    </a>
  </h1>
  <h3 style={{ color: 'blue', marginBottom: '20px' }}>
    Free tier has expired so 😭😭 no application demo till I figure out the next free hosting service
  </h3>
  <h6 style={{ color: 'blue' }}>
    VISIT my GitHub 
    <a href="https://github.com/MuhammadHuzaifa28008" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', marginLeft: '5px' }}>
      here
    </a>
  </h6>
</div>

{/*             

                    </div> */}
            </>
            }
        <div className="load"></div>
    </>
    )
}
