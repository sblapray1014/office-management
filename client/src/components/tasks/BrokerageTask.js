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
  auth: { user, tasks, users, loading }
}) => {
  useEffect(() => {
    getBrokerageTasks();
    getBrokerages();
    getUsers();
  }, [getBrokerageTasks, getUsers, getBrokerages]);
  //   const userName = ((user || {}).user || {}).name;
  let brokerageName;
  let userName;

  if (tasks.length > 0) {
    tasks.map(task => {
      brokerageName = task && task.brokerage ? task.brokerage.name : null;
    });
  }
  if (users.length > 0) {
    users.map(user => {
      userName = user && user.name ? user.name : null;
    });
  }
  return (
    <Fragment>
      <h1 className="large text-kw">{brokerageName} Tasks</h1>
      <table className="table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Task Name</th>
            <th style={{ textAlign: "center" }}>Agent</th>
            <th style={{ textAlign: "center" }}>Assignee</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Task Type</th>
            <th style={{ textAlign: "center" }}>Complete Task</th>
          </tr>
        </thead>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <BrokerageTaskItem
              key={task._id}
              task={task}
              agent={task.user}
              assignee={userName}
            />
          ))
        ) : (
          <tbody style={{ fontWeight: "bold", textAlign: "center" }}>
            No Tasks Found
          </tbody>
        )}
      </table>
    </Fragment>
  );
};

BrokerageTask.propTypes = {
  getBrokerageTasks: PropTypes.func.isRequired,
  getBrokerages: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getBrokerageTasks, getUsers, getBrokerages }
)(BrokerageTask);
