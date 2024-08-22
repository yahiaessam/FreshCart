import AuthNavbar from "../components/Navbar/AuthNavbar"
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router"

function AuthLayout() {
  return (
    <>
      <AuthNavbar />
      <Outlet />
      <Footer/>
    </>
  )
}

export default AuthLayout