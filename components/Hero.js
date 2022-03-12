import {useState} from 'react';
import Link from 'next/link';

function SearchResult(data){
    return(
        <div className="suggestions">
            {data.length? data.map( (d,i)=>
                <Link key={i} href={`/anime/${d.animeId}/`}>
                    <a>
                        <img src={d.animeImg} />
                        <div className="info">
                            <div>{d.animeTitle}</div>
                            <span>{d.status}</span>
                        </div>
                    </a>
                </Link>
            ):<p>No Result Found</p>}

        </div>
    )
}

export default function Hero(props){

    const [search, setSearch] = useState('');

    const handlesearch = (e) =>{
        
        if(e.target.value.length > 2){
        clearTimeout(timer);
        const timer =  setTimeout(()=>
                        fetch("/api/search?keyw="+e.target.value)
                        .then(res => res.json())
                        .then(data => {
                            setSearch(data.length?SearchResult(data.slice(0,4)):'');
                        }), 500)

        }else{
            setSearch('');
        }

    }

    return(
        <section>
            <div className="container-fluid">
                <div className="hero__items" style={{ 
                    backgroundImage: `url("https://www.themoviedb.org/t/p/original/x6jWDL4H9TaBLGEvyej0qKiirBU.jpg")` 
                  }}>
                    <div className="container mt-4">
                        <div className="container mt-4">
                        <div className="row d-flex justify-content-center">
                            <div className="d-flex justify-content-center flex-column">
        
                                <div className="text-center my-4 heading">
                                    <h1>{props.title}</h1>
                                </div>

                                <div className="searchbox">
                                    <div id="srchform">
                                        <input type="text" placeholder="Search Anime here" autoComplete="off" onChange={handlesearch} />
                                        <button><i className="icon_search"></i></button> 
                                        {search}
                                    </div>
                                </div>
                        
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

Hero.defaultProps = {
    title: "AnimeCruzers - Watch HD Anime (No Ads)"
}