import {useState, useEffect} from 'react'
import Link from "next/link"
import Header from "./Header"
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

    const [def, setdef] = useState('')

    const load = document.querySelector("#loading_show")

    const linkobj = {
        default: {
                  embed: def,
                  download: props.gogo?.replace("streaming.php","download")
        },
        streamsb: {
                 embed: props.streamsb,
                 download: props.streamsb?.replace("/e/","/d/")+'.html'
        },
        gogo: {
                embed: props.gogo,
                download: props.gogo?.replace("streaming.php","download")
        }
    }

    const enablebtn = (classname) =>{
        const e = document.querySelector(classname);
        document.querySelectorAll(".server").forEach(elem=>{
            elem === e? elem.setAttribute("disabled",''): elem.removeAttribute("disabled")
        })
    }

    const changelink = (server) =>{
        load? load.style.display = 'block' : ''

        if(server === 0){
            setPlayer({...linkobj.default})
            enablebtn(".default")
        }else if(server === 1){
            // localStorage.setItem('server', 1)
            setPlayer({...linkobj.streamsb})
            enablebtn(".s1")
        }else{
            // localStorage.setItem('server', 2)
            setPlayer({...linkobj.gogo})
            enablebtn(".s2")
        }   
    }

    useEffect(()=>{
        // const savedserver = localStorage.getItem('server');
       
        fetch('/api/default?id='+props.id)
        .then(res=>res.json())
        .then(res=>setdef(res.location))
        .catch(()=>{
            if(props.default){
                changelink(1)
            }else if(props.gogo){
                changelink(2)
            }else{
                setEps(<Error statusCode={404} />) 
            }
        })
        
    },[props.epnum])

    useEffect(()=>{
        changelink(0);
    },[def])
    
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
                                    <iframe onLoad={()=>load? load.style.display = 'none': ''} onError={()=>changelink(1)} src={player?.embed} id="iframeplayer" width='100%' height='100%' allowFullScreen />
                                </div>
                                <div className="eptop">
                                    <button className="btn btn-sm btn-secondary" onClick={(e)=>document.querySelector(".modal").style.display = 'block'}> Download </button>
                                </div>
                            </div>
                            
                            <div className="list_container">
                            <div className="section-title mb-5">
                                <button className="btn btn-secondary server default" onClick={()=>changelink(0)}>Default</button>
                                <button className="ml-2 btn btn-secondary server s1" onClick={()=>changelink(1)}>Server V1</button>
                                <button className="ml-2 btn btn-secondary server s2" onClick={changelink}>Server V2</button>
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
                 setEps(
                 <>
                 <Header title={`Watching ${d.title}`} desc={d.title} />
                 <Episodes {...d} />
                 </>
                 )
                 endpreloader(true)
         })
    }, [eps])

    return(<>{Eps}</>)

}