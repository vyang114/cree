import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../styles/navbar.css';

const NavBar = ({ loggedUsername, setLoggedUsername }) => {
  
  const navigate = useNavigate();

  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">365 Tutor</Link>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink activeclassname="active" className="nav-link" to="/">
            Home
          </NavLink>
        </li>
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
  </nav>
      <Outlet />
    </>
  )
};

export default NavBar;