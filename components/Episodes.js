import {useState, useEffect} from 'react'
import Link from "next/link"

import Error from 'next/error'

function Download(){
    return(
        <>
            <div className="modal">
                <div className="w-100 h-100 text-center" >
                    <div className="modal-content m-auto h-100 w-100">
                        {/* <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> */}

                        <iframe className='h-100 w-100' frameBorder="no" border="0" src='https://gogoplay4.com/download?id=MTgyMzQ3#content-download' sandbox='allow-scripts allow-same-origin allow-downloads'></iframe>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary">Refresh</button>
                      <button type="button" className="btn btn-secondary" onClick={()=>document.querySelector(".modal").style.display = 'none'}>Close</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

function Episodes(props){

    const [player, setPlayer] = useState(null)

    useEffect(()=>{
        const load = document.querySelector("#loading_show")
        props.referer? load.style.display = 'none' : load.style.display = 'block'
        setPlayer(props.referer)
    },[props.num])

    return(
        <>
            <section className="anime-details spad">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">

                            <div className="section-title mb-5">
                                <h4>{`Watching ${props.title}`}</h4>
                            </div>

                            <div className="anime__video__player">
                                <div className="eptop">
                                    <div className="ml-3"><span id="ep-no">{`Episode: ${props.num}`}</span></div>
                                </div>

                                <div id="loading_show" style={{display: 'none', overflow: 'hidden'}}>
                                    <div className="loadindicator"></div>
                                </div>
                                
                                <div id="get-frame" style={{height: 'inherit'}}>
                                    <iframe src={player} id="iframeplayer" width='100%' height='100%' />
                                </div>
                                <div className="eptop">
                                    <button className="btn btn-sm btn-secondary" onClick={(e)=>document.querySelector(".modal").style.display = 'block'}> Download </button>
                                </div>
                            </div>
                            
                            <div className="list_container">
                            <div className="section-title mb-5">
                                <button className="btn btn-secondary" disabled>Server V1</button>
                            </div>
                            <div className="anime__details__episodes">
                            {props?.eplist?.length? props?.eplist?.map((d,i)=>
                                <Link href={'/episodes/'+d.episodeId} key={i}><button className={`single-ep ${d.episodeNum === props.num?'ep-active':''}`}>{d.episodeNum}</button></Link>
                            ):<h3>Coming Soon</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

export default function Main({eps}) {


    const [Eps, setEps] = useState(null)

    const endpreloader = (t=true) =>{
        const preload = document.querySelector("#preloder")
        preload? t? preload.style.display = 'none' : preload.style.display = 'block':''
    }
    
    useEffect(() => {
        endpreloader(false)

         fetch('/api/watch?id='+eps)
         .then(res => res.json())
         .then(d => {
             d.error? 
                 setEps(<Error statusCode={404} />) 
             :
                 setEps(<Episodes title = {d?.title} referer={d.referer} eplist={d.epList} num={d.epnum} />)
                 endpreloader(true)
         })
    }, [eps])

    return(<>{Eps} <Download/></>)

}
