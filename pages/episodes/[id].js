// import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Episodes from "../../components/Episodes"

import { useRouter } from 'next/router'

export default function Main() {
    const router = useRouter()
    const {id} = router.query

  return (
    <>
    {/* <Header /> */}
    <Navbar />
    <Episodes eps={id} />
    <Footer />
    </>
  )
}
