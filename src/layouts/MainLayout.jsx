import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router"

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer/>
    </>
  )
}

export default MainLayout