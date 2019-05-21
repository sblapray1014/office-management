import React, { Fragment } from "react";

import PropTypes from "prop-types";

const UserTaskItem = ({
  task: { user, assignee, status, taskName, taskType, _id },
  authUser
}) => {
  return (
    <Fragment>
      <tbody>
        <tr key={_id}>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {taskName}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {user.name}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {assignee === authUser.user._id ? (
              <p>{authUser.user.name}</p>
            ) : (
              <p>User Not Found</p>
            )}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {status}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {taskType === {} ? <p>See Task Name!</p> : <p>{taskType}</p>}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            <button className="btn btn-dark">Complete Task</button>
          </td>
        </tr>
      </tbody>
    </Fragment>
  );
};

UserTaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired
};

export default UserTaskItem;
