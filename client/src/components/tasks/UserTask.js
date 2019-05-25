import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
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
    loadUser();
  }, [getUserTasks, loadUser]);
  const userName = ((user || {}).user || {}).name;

  return (
    <Fragment>
      <h1 className="large text-kw">{userName}'s Tasks</h1>
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
            No Tasks Found
          </tbody>
        )}
      </table>
    </Fragment>
  );
};

UserTask.propTypes = {
  getUserTasks: PropTypes.func.isRequired,
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
