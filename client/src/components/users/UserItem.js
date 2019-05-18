import React, { Fragment } from "react";

import PropTypes from "prop-types";

const UserItem = ({
  user: { name, email, phone, inCoaching, onTeam },
  brokerage
}) => {
  return (
    <div className="profile bg-light">
      <h2>{name}</h2>
      <p>
        {onTeam == true ? (
          <Fragment>
            <p style={{ fontWeight: "bold" }}>
              <i className="fas fa-user-check" /> On A Team!
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <p style={{ fontWeight: "bold" }}>
              <i className="fas fa-user-negative" /> Not On A Team!
            </p>
          </Fragment>
        )}
      </p>
      <p>
        {inCoaching == true ? (
          <Fragment>
            <p className="text-primary" style={{ fontWeight: "bold" }}>
              <i className="fas fa-user-check" /> In Coaching!
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <p className="text-kw" style={{ fontWeight: "bold" }}>
              <i className="fas fa-user-minus" />
              Not in Coaching
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
