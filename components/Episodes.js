import {useState, useEffect} from 'react'
import Link from "next/link"

import Error from 'next/error'

function Download({link}){
    return(
        <>
            <div className="modal">
                <div className="w-100 h-100 text-center" >
                    <div className="modal-content m-auto h-100 w-100">
                    <iframe id="iframee" className='h-100 w-100' frameBorder="no" border="0" src={link} sandbox='allow-scripts allow-same-origin allow-forms allow-downloads'></iframe>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" onClick={()=>{const iframe = document.getElementById('iframee'); iframe.src = iframe.src}}>Refresh</button>
                      <button type="button" className="btn btn-secondary" onClick={()=>document.querySelector(".modal").style.display = 'none'}>Close</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

function Episodes(props){

    const [player, setPlayer] = useState({embed:'', download:''})
    const load = document.querySelector("#loading_show")

    const changelink = (server) =>{
        load? load.style.display = 'block' : ''
        const server1 = document.querySelector('.server1')
        const server2 = document.querySelector('.server2')

        if(server === 1){
            setPlayer({embed: props.streamsb, download: props.streamsb?.replace("/e/","/d/")+'.html'})
            server1.setAttribute('disabled','')
            server2.removeAttribute('disabled')
        }else{
            setPlayer({embed:props.gogo, download: props.gogo?.replace("streaming.php","download")})
            server1.removeAttribute('disabled')
            server2.setAttribute('disabled','')
        }   
    }

    useEffect(()=>{
        if(props.streamsb){
            changelink(1)
        }else if(props.gogo){
            changelink()
        }else{
            setEps(<Error statusCode={404} />) 
        }
        
    },[props.epnum])
    
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
                                    <div className="ml-3"><span id="ep-no">{`Episode: ${props.epnum}`}</span></div>
                                </div>

                                <div id="loading_show" style={{display: 'none', overflow: 'hidden'}}>
                                    <div className="loadindicator"></div>
                                </div>
                                
                                <div id="get-frame" style={{height: 'inherit'}}>
                                    <iframe onLoad={()=>load? load.style.display = 'none': ''} src={player?.embed} id="iframeplayer" width='100%' height='100%' allowFullScreen />
                                </div>
                                <div className="eptop">
                                    <button className="btn btn-sm btn-secondary" onClick={(e)=>document.querySelector(".modal").style.display = 'block'}> Download </button>
                                </div>
                            </div>
                            
                            <div className="list_container">
                            <div className="section-title mb-5">
                                <button className="btn btn-secondary server1" onClick={()=>changelink(1)}>Server V1</button>
                                <button className="ml-2 btn btn-secondary server2" onClick={changelink}>Server V2</button>
                            </div>
                            <div className="anime__details__episodes">
                            {props?.epList?.length? props?.epList?.map((d,i)=>
                                <Link href={'/episodes/'+d.episodeId} key={i}><button className={`single-ep ${d.episodeNum === props.epnum?'ep-active':''}`}>{d.episodeNum}</button></Link>
                            ):<h3>Coming Soon</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Download link={player?.download} />
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
                 setEps(<Episodes {...d} />)
                 endpreloader(true)
         })
    }, [eps])

    return(<>{Eps}</>)

}