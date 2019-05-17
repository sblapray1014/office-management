import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">KW Westfield Management</Link>
      </h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
