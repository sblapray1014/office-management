import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">KW Westfield Management Solutions</h1>
          <p className="lead">
            The place to manage tasks, users and systems. Get things done
            efficiently!
          </p>
          <div className="buttons">
            <Link
              to="/register"
              className="btn btn-kw"
              style={{ color: "white" }}
            >
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

export default connect()(Landing);
