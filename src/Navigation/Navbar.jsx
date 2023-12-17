import React from "react";
import { Link } from 'react-router-dom';
import './Styles/styles.css'


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/"> Home </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/"> Orders </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/facts"> SplitInvoces </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown 
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="#"> Action </a>
              <a className="dropdown-item" href="#"> Another action </a>
              <a className="dropdown-item" href="#"> Something else here </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
