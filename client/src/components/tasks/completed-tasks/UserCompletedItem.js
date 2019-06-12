import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const UserCompletedItem = ({
  task: { agent, assignee, status, taskName, taskType, _id },
  authUser
}) => {
  const agentName = agent && agent ? agent.name : null;

  return (
    <Fragment>
      {status === "complete" ? (
        <tbody>
          <tr key={_id}>
            <td className="agent-font" style={{ textAlign: "center" }}>
              {taskName}
            </td>
            <td className="agent-font" style={{ textAlign: "center" }}>
              {agentName}
            </td>
            <td className="agent-font" style={{ textAlign: "center" }}>
              {assignee.name}
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
      ) : null}
    </Fragment>
  );
};

UserCompletedItem.propTypes = {
  task: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired
};

export default UserCompletedItem;
