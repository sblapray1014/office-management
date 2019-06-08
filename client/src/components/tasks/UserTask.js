import React, { Fragment, useEffect, useState } from "react";
import "./UserTask.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserTasks } from "../../actions/task";
import { loadUser } from "../../actions/auth";
import UserTaskItem from "./UserTaskItem";
import PropTypes from "prop-types";

const UserTask = ({
  getUserTasks,
  loadUser,
  auth: { user, tasks, loading }
}) => {
  useEffect(() => {
    getUserTasks();
  }, [getUserTasks]);

  const userName = ((user || {}).user || {}).name;
  const userId = ((user || {}).user || {})._id;

  return (
    <Fragment>
      <div className="task-display-container">
        <div className="rowC">
          <h1 className="large text-kw">{userName}'s Tasks</h1>{" "}
          <Link to={`/create-task/${userId}`}>
            <i
              className="fas fa-plus-circle fa-3x"
              style={{ color: "gray", marginLeft: "480px", marginTop: "16px" }}
            />
          </Link>
        </div>
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
              <UserTaskItem key={task._id} task={task} authUser={user} />
            ))
          ) : (
            <tbody style={{ fontWeight: "bold", textAlign: "center" }}>
              No Tasks Found!
            </tbody>
          )}
        </table>
      </div>
    </Fragment>
  );
};

UserTask.propTypes = {
  getUserTasks: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserTasks, loadUser }
)(UserTask);
