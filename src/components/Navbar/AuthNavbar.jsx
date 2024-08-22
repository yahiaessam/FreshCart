import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";

function AuthNavbar() {
  return (
    <>
      <div className="navbar w-full mx-auto lg:px-5 flex items-center justify-between bg-[#f0f3f2]">
        <div>
          <div >
            <Link to={"/"} className="btn btn-ghost text-xl">
              <img src={Logo} alt="FreshCart" />
            </Link>
          </div>
        </div>
        <div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink to={'/login'} className={"sub-title"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={'/register'} className={"sub-title"}>Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthNavbar;
