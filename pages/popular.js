import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Blocks from "../components/Blocks"

export default function Popular() {
  return (
    <>
     <Header />
     <Navbar />
    <section className="product spad">
      <div className="container">
        <div className="row mx-md-4">
          <div className="col">
            <Blocks id="popular" name="Popular Anime" />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
