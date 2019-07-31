import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/game">Game</Link>
      </div>
    </div>
  );
};

export default Navbar;
