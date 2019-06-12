import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">REasy</h1>
          <p className="lead">
            The place for premier Brokerage Management Solutions. The perfect
            solution to manage tasks, users and systems. Get things done
            efficiently and get back to what matters most: the people!
          </p>
          <div className="buttons">
            <Link to="/about" className="btn btn-kw" style={{ color: "white" }}>
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
