import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import PropTypes from "prop-types";

const UserTaskItem = ({
  task: { agent, assignee, status, taskName, taskType, _id, dueDate },
  authUser
}) => {
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
              {assignee.name}
            </td>
            <td className="agent-font" style={{ textAlign: "center" }}>
              {status}
            </td>
            <td className="agent-font" style={{ textAlign: "center" }}>
              {taskType === {} ? (
                <p>See Task Name!</p>
              ) : (
                <p>{taskType.charAt(0).toUpperCase() + taskType.slice(1)}</p>
              )}
            </td>
            <td className="agent-font" style={{ textAlign: "center" }}>
              <Moment format="MM/DD/YYYY">{dueDate}</Moment>
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
