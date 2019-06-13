import React, { Fragment, useEffect } from "react";
import "./UserTask.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserTasks } from "../../actions/task";
import { loadUser } from "../../actions/auth";
import UserTaskItem from "./UserTaskItem";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const UserTask = ({
  getUserTasks,
  loadUser,
  auth: { user, loading },
  tasks: { tasks }
}) => {
  useEffect(() => {
    getUserTasks();
  }, [getUserTasks]);

  const userName = ((user || {}).user || {}).name;
  const userId = ((user || {}).user || {})._id;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div className="task-display-container">
          <div className="rowC">
            <h1 className="large text-kw">{userName}'s Tasks</h1>{" "}
            <div>
              <Link
                to="/tasks/me/completed"
                className="btn btn-kw"
                style={{
                  marginLeft: "260px",
                  padding: "10px",
                  width: "140px",
                  marginTop: "19px",
                  color: "white"
                }}
              >
                Completed Tasks
              </Link>
            </div>
            <div>
              <Link
                to={`/create-task/${userId}`}
                className="btn btn-kw"
                style={taskStyle}
              >
                Create a Task
              </Link>
            </div>
          </div>
          <table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Task Name</th>
                <th style={{ textAlign: "center" }}>Agent</th>
                <th style={{ textAlign: "center" }}>Assignee</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Task Type</th>
                <th style={{ textAlign: "center" }}>Due Date</th>
                <th style={{ textAlign: "center" }}>Complete Task</th>
              </tr>
            </thead>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <UserTaskItem key={task._id} task={task} authUser={user} />
              ))
            ) : (
              <table className="table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Task Name</th>
                    <th style={{ textAlign: "center" }}>Agent</th>
                    <th style={{ textAlign: "center" }}>Assignee</th>
                    <th style={{ textAlign: "center" }}>Status</th>
                    <th style={{ textAlign: "center" }}>Task Type</th>
                    <th style={{ textAlign: "center" }}>Due Date</th>
                    <th style={{ textAlign: "center" }}>Complete Task</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="agent-font" style={{ textAlign: "center" }}>
                      No Tasks Found!
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </table>
        </div>
      </Fragment>
    );
  }
};

const taskStyle = {
  marginLeft: "10px",
  padding: "10px",
  marginTop: "19px",
  color: "white"
};

UserTask.propTypes = {
  getUserTasks: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
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
  { getUserTasks, loadUser }
)(UserTask);
