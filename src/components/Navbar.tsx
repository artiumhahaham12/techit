import { FunctionComponent } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
    
}
 
const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigator:NavigateFunction = useNavigate()
    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-dark text-light"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/home">
              TechIt
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="/cart">
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>
                <form action="" className="w-50 d-flex">
                  <button
                    className="btn d-flex align-self-end btn-outline-success"
                    onClick={() => {
                      navigator("/");
                      localStorage.removeItem("userId")
                    }}
                  >
                    Logout
                  </button>
                </form>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
}
 
export default Navbar;