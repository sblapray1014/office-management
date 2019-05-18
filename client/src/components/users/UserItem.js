import React, { Fragment } from "react";

import PropTypes from "prop-types";

const UserItem = ({ user: { name, email, phone, inCoaching, onTeam } }) => {
  return (
    <div className="profile bg-light">
      <h2>{name}</h2>
      <p> Agent at </p>
      <p>{onTeam}</p>
      <p>
        {inCoaching == true ? (
          <Fragment>
            <p style={{ color: "green", fontWeight: "bold" }}>
              <i className="fas fa-user-check" /> This Agent is in Coaching!
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <p>
              <i className="fas fa-user-minus" />
              This Agent is Not in Coaching
            </p>
          </Fragment>
        )}
      </p>
      <p>Email Address: {email}</p>
      <p>Phone Number: {phone}</p>
    </div>
  );
};

UserItem.propTypes = {
  users: PropTypes.object.isRequired
};

export default UserItem;
