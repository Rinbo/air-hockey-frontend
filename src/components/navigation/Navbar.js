import React from "react";
import { Link } from "react-router-dom";
import logo from "../../resources/b-hockey.png";

const Navbar = () => {
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "200px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const renderSideNav = () => {
    return (
      <>
        <div id="mySidenav" className="sidenav">
          <div className="closebtn" onClick={closeNav}>
            &times;
          </div>
          <div>{renderLinks()}</div>
        </div>
      </>
    );
  };

  const renderLinks = () => {
    return (
      <div className="side-container">
        <div>
          <Link to="/lobby" onClick={() => closeNav()}>
            Lobby
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderSideNav()}
      <div id="hamburger">
        <button className="bson-button btn-large" onClick={openNav}>
          >>
        </button>
      </div>
      <div id="navbar-top" className="nav-container">
        <div>
          <Link to="/">
            <img src={logo} style={{ width: 180 }} alt="logo" />
          </Link>
        </div>
        <div>
          <Link className="bson-button m-n" to="/lobby">
            Lobby
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
