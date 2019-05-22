import React, { Fragment } from "react";

import PropTypes from "prop-types";

const BrokerageTaskItem = ({
  task: { user, assignee, status, taskName, taskType, _id },
  users
}) => {
  //   const allUsers = users.map(user => {
  //     const userName = user.name;
  //     const userId = user._id;
  //   });
  return (
    <Fragment>
      <tbody>
        <tr key={_id}>
          <td className="agent-font" style={{ textAlign: "center" }}>
            {taskName}
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            TODO - get AGENT
          </td>
          <td className="agent-font" style={{ textAlign: "center" }}>
            TODO - get USER
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

BrokerageTaskItem.propTypes = {
  task: PropTypes.object.isRequired
};

export default BrokerageTaskItem;
