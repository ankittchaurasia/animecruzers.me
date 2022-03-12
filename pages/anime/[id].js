import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Anime from "../../components/Anime"

import { useRouter } from 'next/router'

export default function AnimeDetails() {
    const router = useRouter()
    const {id} = router.query

  return (
    <>
    <Header />
    <Navbar />
    <Anime anime={id} />
    <Footer />
    </>
  )
}
