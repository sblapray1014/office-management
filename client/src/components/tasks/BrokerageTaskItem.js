import React, { Fragment } from "react";
import Moment from "react-moment";

import PropTypes from "prop-types";

const BrokerageTaskItem = ({
  task: { agent, assignee, status, taskName, taskType, _id, dueDate }
}) => {
  // const newUserObject = {};

  // newUserObject.id = user._id;
  // newUserObject.name = user.name;

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
              <Moment format="MM/DD/YYYY">{dueDate}</Moment>
            </td>
            <td className="agent-font" style={{ textAlign: "center" }}>
              {taskType === {} ? (
                <p>See task tame!</p>
              ) : (
                <p>{taskType.charAt(0).toUpperCase() + taskType.slice(1)}</p>
              )}
            </td>
          </tr>
        </tbody>
      )}
    </Fragment>
  );
};

BrokerageTaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  brokerage: PropTypes.object
};

export default BrokerageTaskItem;
