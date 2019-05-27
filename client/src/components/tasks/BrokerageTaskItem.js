import React, { Fragment } from "react";

import PropTypes from "prop-types";

const BrokerageTaskItem = ({
  task: { user, assignee, status, taskName, taskType, _id },
  agent,
  users,
  brokerage
}) => {
  const newUserObject = {};

  newUserObject.id = user._id;
  newUserObject.name = user.name;

  return (
    <Fragment>
      <tbody>
        <tr key={_id}>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {taskName}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {user._id === agent._id ? (
              <p>{agent.name}</p>
            ) : (
              <span>Agent not found</span>
            )}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            TODO - Get Assignee
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {status}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {taskType === {} ? <p>See task tame!</p> : <p>{taskType}</p>}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            <button className="btn btn-dark">Complete Task</button>
          </td>
        </tr>
      </tbody>
    </Fragment>
  );
};

BrokerageTaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  brokerage: PropTypes.object
};

export default BrokerageTaskItem;
