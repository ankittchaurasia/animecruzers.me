import Header from "../components/Header"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

import Blocks from "../components/Blocks"
import Footer from "../components/Footer"


function Main(){

  return(
    <section className="product spad">
      <div className="container">
        <div className="row mx-md-4">
          <div className="col">
            <Blocks id="recent-release" name="Recent Episodes" />
            <Blocks id="top-airing" name="Top Airing" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
 return(
   <>
    <Header />
    <Navbar />
    <Hero />
    <Main />
    <Footer />
   </>
)
}
