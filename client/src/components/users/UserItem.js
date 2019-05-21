import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const UserItem = ({ user }) => {
  const users = user.map(user => (
    <tr key={user._id}>
      <td className="agent-font" style={{ textAlign: "center" }}>
        {user.name}
      </td>
      <td className="agent-font" style={{ textAlign: "center" }}>
        {user.email}
      </td>
      <td className="agent-font" style={{ textAlign: "center" }}>
        {user.phone}
      </td>
      <td className="agent-font" style={{ textAlign: "center" }}>
        {user.inCoaching === true ? <span>Yes</span> : <span>No</span>}
      </td>
      <td className="agent-font" style={{ textAlign: "center" }}>
        {user.onTeam === true ? <span>Yes</span> : <span>No</span>}
      </td>
      <td className="agent-font">
        <Link
          to="/profile "
          className="btn btn-dark"
          style={{ color: "white" }}
        >
          View Profile
        </Link>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <table className="table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "center " }}>Name</th>
            <th style={{ textAlign: "center " }}>Email</th>
            <th style={{ textAlign: "center " }}>Phone Number</th>
            <th style={{ textAlign: "center " }}>In Coaching</th>
            <th style={{ textAlign: "center " }}>On A Team</th>
            <th style={{ textAlign: "center " }}>View Agent Profile</th>
          </tr>
        </thead>
        <tbody>{users}</tbody>
      </table>
    </Fragment>
  );
};

UserItem.propTypes = {
  user: PropTypes.array.isRequired
};

export default UserItem;
