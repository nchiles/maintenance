import React from "react";
import { Link } from "react-router-dom";
 
function Navbar() {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className='container'>
        <Link to={"/"} className="navbar-brand">Vector Prepress</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to={"/machines"} className="nav-link">Equipment</Link>
            </li>          
            <li className="nav-item active">
              <Link to={"/machines/preventative-maintenance"} className="nav-link">Maintenance</Link>
            </li>          
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
 