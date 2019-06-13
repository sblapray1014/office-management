import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getBrokerageTasks } from "../../actions/task";
import { getUsers, getBrokerages } from "../../actions/auth";
import BrokerageTaskItem from "./BrokerageTaskItem";
import PropTypes from "prop-types";

const BrokerageTask = ({
  getBrokerageTasks,
  getBrokerages,
  getUsers,
  auth: { user, users, loading },
  tasks: { tasks }
}) => {
  useEffect(() => {
    getBrokerageTasks();
    getBrokerages();
    getUsers();
  }, [getBrokerageTasks, getUsers, getBrokerages]);
  //   const userName = ((user || {}).user || {}).name;
  let brokerageName;

  if (tasks.length > 0) {
    tasks.map(task => {
      return (brokerageName =
        task && task.brokerage ? task.brokerage.name : null);
    });
  }

  return (
    <Fragment>
      <div className="task-display-container">
        <h1 className="large text-kw">{brokerageName} Tasks</h1>
        <table className="table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Task Name</th>
              <th style={{ textAlign: "center" }}>Agent</th>
              <th style={{ textAlign: "center" }}>Assignee</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Due Date</th>
              <th style={{ textAlign: "center" }}>Task Type</th>
            </tr>
          </thead>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <BrokerageTaskItem key={task._id} task={task} users={users} />
            ))
          ) : (
            <tbody style={{ fontWeight: "bold", textAlign: "center" }}>
              No Tasks Found
            </tbody>
          )}
        </table>
      </div>
    </Fragment>
  );
};

BrokerageTask.propTypes = {
  getBrokerageTasks: PropTypes.func.isRequired,
  getBrokerages: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  tasks: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  tasks: state.task
});

export default connect(
  mapStateToProps,
  { getBrokerageTasks, getUsers, getBrokerages }
)(BrokerageTask);
