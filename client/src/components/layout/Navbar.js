import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">KW Westfield Management</Link>
      </h1>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
