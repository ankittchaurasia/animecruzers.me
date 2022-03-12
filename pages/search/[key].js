import Header from "../../components/Header"
import Hero from "../../components/Hero"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import Link from 'next/link'


function Search({keyw}){

    const btnclass = keyw?.replace(/\s/g,'')
    
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
        t? preload.style.display = 'none' : preload.style.display = 'block'
    }

    const getdata = (key, page) =>
        fetch(`/api/search?keyw=${key}&page=${page}`)
        .then(res => res.json())
        .then(d => d)
        .catch(err => err)
    
    const [data, setdata] = useState([])

    const handleload = (e) =>{
        loadbutton(e,true)
        const page =  parseInt(e.target.getAttribute('clicked')) + 1
        getdata(keyw, page)
        .then(d => {
            setdata([...data, ...d])
            loadbutton(e,false)
        })
        .catch(() => {loadbutton(e,false);hidebutton(e)})
        e.target.setAttribute('clicked', page)
    }

    useEffect(()=>{
        endpreloader(false)
        getdata(keyw,1)
        .then(d => {
            setdata(d)
            endpreloader()
            hidebutton(document.querySelector(`.${btnclass}`),false)
            })
    },[keyw])
    
      return(
        <div className="card__product">
            
            <div className="row sec-title">
                <div className="section-title"><h4>{`Search Result for ${keyw}`}</h4></div>
            </div>

            <div className="row row-cols-lg-5 row-cols-2">
                {data.length? data.map((d,i)=>
                    <div key={i} className="col">
                        <div className="mb-5">
                            <Link href={d.animeId?`/anime/${d.animeId}`:d.episodeId?`/episode/${d.episodeId}`:'/'}>
                            <a>
                                <div className="card_pic" style={{ backgroundImage: `url("${d.animeImg}")` }}>
                                    <div className="ep">{d.status}</div>
                                </div>
                            </a>
                            </Link>

                            <div className="product__item__text">
                                <h5><Link href={`/anime/${d.animeId}`}><a>{d.animeTitle}</a></Link></h5>
                            </div>
                        </div>
                    </div>
                    ):()=>{document.querySelector(`.${btnclass}`).remove()}}
            </div>

            <div className="row justify-content-center">
                <button className={`btn btn-dark ${btnclass}`} clicked="1" onClick={handleload}>Load More</button>
            </div>
        </div>
      )
}


export default function Main() {

    const router = useRouter()
    const {key} = router.query

    return(
      <>
       <Header />
       <Navbar />
       <Hero />
       <section className="product spad">
        <div className="container">
          <div className="row mx-md-4">
             <div className="col">
                <Search keyw={key} />
             </div>
          </div>
        </div>
     </section>
       <Footer />
      </>
   )
   }
   