import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div>
        <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
      </div>
      <div>
        <Link to={`${process.env.PUBLIC_URL}/game`}>Game</Link>
      </div>
    </div>
  );
};

export default Navbar;
