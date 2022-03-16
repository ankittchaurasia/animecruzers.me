import {useState, useEffect} from 'react'
import Link from "next/link"
import Header from "./Header"

import Error from 'next/error'

function Anime(props){

    return(
    <section className="anime-details spad">
        <div className="container">
            <div className="anime__details__content">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="anime__details__pic card_pic"  style={{ 
                            backgroundImage: `url('${props.animeImg}')` 
                        }}>
                            <div className="rating">{props.status}</div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="anime__details__text">
                            <div className="anime__details__title">
                                <h3>{props.animeTitle}</h3>
                                <span>{props.otherNames}</span>
                            </div>

                            <p>{props.synopsis}</p>
                            <div className="anime__details__widget">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <ul>
                                            <li><span className='mb-2'>Type:</span> {props.type}</li>
                                            <li><span className='mb-2'>Date aired:</span> {props.releasedDate}</li>
                                            <li><span className='mb-2'>Status:</span> {props.status}</li>
                                            <li><span className='mb-2'>Total Eps:</span> {props.totalEpisodes}</li>
                                            <li>
                                                <div className='anime_genre d-flex'>
                                                    <div><span>Genre:</span></div>
                                                    <div className='d-flex flex-column'>
                                                        {props?.genres?.map( (d,i)=><a key={i}>{d}</a>)}
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                        </div>
                        
                        <div className="anime__details__title">
                                <h3>Episode List </h3>
                        </div>

                        <div className="anime__details__episodes">
                            {props?.episodesList?.length? props?.episodesList?.map((d,i)=>
                                <Link href={'/episodes/'+d.episodeId} key={i}><button className="single-ep">{d.episodeNum}</button></Link>
                            ):<h3>Coming Soon</h3>}
                        </div>

                     </div>
                </div>
            </div>
        </div>
    </div>
    </section>
    )

}

export default function Details({anime}){

    const [details, setDetails] = useState(null)

    const endpreloader = (t=true) =>{
        const preload = document.querySelector("#preloder")
        preload? t? preload.style.display = 'none' : preload.style.display = 'block':''
    }
    
    useEffect(() => {
        endpreloader(false)

            fetch('/api/anime-details?id=' +anime)
            .then(res => res.json())
            .then(d => {
                d.error? 
                    setDetails(<Error statusCode={404} />) 
                :
                    setDetails(
                    <>
                    <Header title={d.animeTitle} desc={d.synopsis} img={d.animeImg}  />
                    <Anime {...d} />
                    </>
                    )
                    endpreloader(true)
            })
    }, [anime])

    return(<>{details}</>)

}