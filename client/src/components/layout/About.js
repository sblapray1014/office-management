import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <h1 style={aboutStyle} className="large text-kw">
        About REasy
      </h1>
      <div
        className="w3-card-4"
        style={{ borderRadius: "20px", padding: "20px" }}
      >
        <p className="w3-container">
          Founded in 2019 by Cameron Wilson and Spencer LaPray they found that
          there were no real products on the market to help Real Estate
          Brokerages manage the multitude of tasks that they need to complete in
          order to assist their agents in their business, speciically as agents
          join their company.
        </p>
        <br />
        <p className="w3-container">
          There had to be a better way, right? With a texting platform and email
          platform integrated REasy makes it easier for you to manage all the
          things you need to get accomplished!
        </p>
      </div>

      <p style={contactStyle}>
        Contact Spencer at spencer@kwwestfield.com today for a demo!
      </p>
    </Fragment>
  );
};

const aboutStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const contactStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "30px"
};

export default About;
