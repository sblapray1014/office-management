import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";

const TemplateItem = ({ template: { _id, title, subject, body, type } }) => {
  const [showTemplateInfo, setShowTemplateInfo] = useState(false);
  const onClick = () => {
    setShowTemplateInfo(!showTemplateInfo);
  };
  console.log(body);
  return (
    <Fragment>
      <div className="w3-container w3-card" style={cardStyle}>
        <h1>Template: {title}</h1>
        <i
          onClick={onClick}
          className="fas fa-sort-down"
          style={{ cursor: "pointer" }}
        />{" "}
        Show More Info
        {showTemplateInfo ? (
          <div style={{ padding: "10px", marginTop: "10px" }}>
            <div>
              {subject ? (
                <p>
                  <span style={{ fontWeight: "bold" }}>Subject:</span> {subject}
                </p>
              ) : null}
            </div>
            <p>
              <span style={{ fontWeight: "bold" }}>Message Content:</span>{" "}
              {body}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Message Type:</span>{" "}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
            <Link
              to="/edit/template"
              className="btn btn-dark btn-sm"
              style={{ borderRadius: "8px", margin: "8px" }}
            >
              Edit Template
            </Link>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

const cardStyle = {
  padding: "14px",
  marginTop: "20px",
  marginBottom: "10px",
  borderRadius: "8px"
};

export default TemplateItem;
