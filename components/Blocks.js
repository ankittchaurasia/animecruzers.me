import {useState, useEffect} from 'react'
import Link from 'next/link'

export default function Blocks({id, name}){

    const loadbutton = (e,t=true) =>{
        t? e.target.innerHTML = 'Loading...' : e.target.innerHTML = 'Load More'
    }

    const hidebutton = (e,t=true) =>{
        if(t){
            e.target.style.display = 'none'
        }else{
            e.style.display = 'block'
            e.setAttribute('clicked', 1)
        } 
    }

    const endpreloader = (t=true) =>{
        const preload = document.querySelector("#preloder")
        preload? t? preload.style.display = 'none' : preload.style.display = 'block':''
    }

    const getdata = (id, page) =>{
        return fetch(`/api/${id}?page=${page}`)
        .then(res => res.json())
        .then(data => data)
        .catch(err => err)
    }
    const [data, setdata] = useState([])
     

    const handleload = (e) =>{
        loadbutton(e)
        const page =  parseInt(e.target.getAttribute('clicked')) + 1
        getdata(id, page)
        .then(d => {
            setdata([...data, ...d])
            loadbutton(e,false)
        })
        .catch(() => {loadbutton(e,false);hidebutton(e)})
        e.target.setAttribute('clicked', page)
    }

    useEffect(()=>{
        getdata(id,1)
        .then(d => {
            setdata(d)
            endpreloader();
            })
    },[])

    return(
        <div className="card__product">
            
            <div className="row sec-title">
                <div className="section-title"><h4>{name}</h4></div>
            </div>

            <div className="row row-cols-lg-5 row-cols-2">
                {data.length? data.map((d,i)=>
                    <div key={i} className="col">
                        <div className="mb-5">
                            <Link href={d.animeId?`/anime/${d.animeId}`:d.episodeId?`/episodes/${d.episodeId}`:'/'}>
                            <a>
                                <div className="card_pic" style={{ backgroundImage: `url("${d.animeImg}")` }}>
                                    {d.latestEp?<div className="rating">{d.latestEp}</div>:null}
                                    {d.releasedDate?<div className="ep">{d.releasedDate}</div>:null}
                                    {d.episodeNum?<div className="ep">{`Ep: ${d.episodeNum}`}</div>:null}
                                    {d.subOrDub?<div className="view">{d.subOrDub}</div>:null}
                                </div>
                            </a>
                            </Link>

                            <div className="product__item__text">
                                <h5><Link href={`/anime/${d.animeId}`}><a>{d.episodeNum?d.animeTitle+' Episode '+d.episodeNum:d.animeTitle}</a></Link></h5>
                            </div>
                        </div>
                    </div>
                    ):()=>hidebutton(document.querySelector(`.${id}`),false)}
            </div>

            <div className="row justify-content-center">
                <button className={`btn btn-dark ${id}`} clicked="1" onClick={handleload}>Load More</button>
            </div>
        </div>
    )
}