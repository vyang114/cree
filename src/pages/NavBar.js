import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import '../styles/navbar.css';

const NavBar = () => {

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/">Cree Revitalization</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/game">
            Game
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/vocabulary">
              Vocabulary
            </NavLink>
          </li>
        </ul>
      </div>
      </div>
  </nav>
      <Outlet />
    </>
  )
};

export default NavBar;