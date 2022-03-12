import Link from 'next/link';
export default function Navbar(){
    return(
        <>
            <header className="header">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-2">
                            <div className="header__logo">
                                <Link href="/">
                                    <img src="/assets/img/logo.png" alt="Amime Cruzers" />
                                </Link>
                            </div>
                        </div>
                    <div className="col-lg-8">
                
                    <div className="header__nav">
                        <nav className="header__menu mobile-menu">
                          <ul>
                            <li className="active"><Link href="/"><a>Home</a></Link></li>
                            <li><Link href="/popular"><a>Popular Anime</a></Link></li>
                            <li><Link href="/movies"><a>Anime Movies</a></Link></li>
                            <li><a href="https://instagram.com/animecruzers/">Instagram</a></li>
                          </ul>
                        </nav>
                    </div>
                </div>

                <div className="col-lg-2">
                    <div className="header__right">
                        <a onClick={()=>document.querySelector(".search-model").style.display='block'}><span className="icon_search"></span></a>
                    </div>
                </div>

                </div>
                    <div id="mobile-menu-wrap">
                        <div className="slicknav_menu"><a onClick={()=>{
                             document.querySelector(".slicknav_nav").classList.toggle('show')
                        }
                        } href="#" aria-haspopup="true" role="button" tabIndex="0" className="slicknav_btn slicknav_collapsed"><span className="slicknav_menutxt">MENU</span><span className="slicknav_icon"><span className="slicknav_icon-bar"></span><span className="slicknav_icon-bar"></span><span className="slicknav_icon-bar"></span></span></a>
                            <nav className="slicknav_nav slicknav_hidden" aria-hidden="true" role="menu" style={{display: 'none'}}>
                            <ul>
                            <li className="active"><Link href="/"><a>Home</a></Link></li>
                            <li><Link href="/popular"><a>Popular Anime</a></Link></li>
                            <li><Link href="/movies"><a>Anime Movies</a></Link></li>
                            <li><a href="https://instagram.com/animecruzers/">Instagram</a></li>
                          </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            </header>
        </>
    )
}