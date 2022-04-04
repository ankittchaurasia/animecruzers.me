import Router from 'next/router'

export default function Footer() {
  return (
        <footer className="footer">
            <div className="page-up">
                <a href="#" id="scrollToTopButton"><span className="arrow_carrot-up"></span></a>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        {/* <div className="footer__logo">
                            <a href="./index.html"><img src="img/logo.png" alt=""></a>
                        </div> */}
                    </div>
                    <div className="col-lg-6">
                        <div className="footer__nav anime__details__text">
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <p>Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.</p>
                    </div>
                </div>
            </div>

            <div className="search-model">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-switch" onClick={()=>document.querySelector(".search-model").style.display = 'none'}>
                        <i className="icon_close"></i>
                    </div>

                    <form className="search-model-form" onSubmit={(e)=>{
                        e.preventDefault();
                        const searchtext = document.querySelector("#search-input").value;
                        Router.push('/search/'+searchtext);
                        document.querySelector(".search-model").style.display = 'none'
                    }}>
                        <input type="text" name="search" id="search-input" autoComplete="off" placeholder="Search here....." />
                    </form>

                </div>
            </div>

        </footer>
  )
}