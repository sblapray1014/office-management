import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const UserTaskItem = ({
  task: { agent, assignee, status, taskName, taskType, _id },
  authUser
}) => {
  console.log(agent);
  return (
    <Fragment>
      {status === "complete" ? null : (
        <tbody>
          <tr key={_id}>
            <td className="agent-font" style={{ textAlign: "center" }}>
              {taskName}
            </td>
            <td className="agent-font" style={{ textAlign: "center" }}>
              {agent.name}
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
              <Link to={`/tasks/me/${_id}`} className="btn btn-dark">
                Complete Task
              </Link>
            </td>
          </tr>
        </tbody>
      )}
    </Fragment>
  );
};

UserTaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired
};

export default UserTaskItem;
