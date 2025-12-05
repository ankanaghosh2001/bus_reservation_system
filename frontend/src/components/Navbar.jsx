import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  return (
    <nav>
      
      <div className="left">Bus.Anywhere</div>
      <div className="right">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li><NavLink to="/aboutUs">About</NavLink></li>
          <li><NavLink to="/contactUs">Contact</NavLink></li>
        </ul>
      </div>
      
    </nav>
  );
};

export default Navbar;
