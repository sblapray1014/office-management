import React, { Fragment, useEffect } from "react";
import "../UserTask.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserTasks } from "../../../actions/task";
import { loadUser } from "../../../actions/auth";
import UserCompletedItem from "./UserCompletedItem";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner";

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
          <Link to="/tasks/me" className="btn btn-dark">
            Go Back to Tasks
          </Link>
          <div className="rowC">
            <h1 className="large text-kw">{userName}'s Completed Tasks</h1>{" "}
          </div>
          <table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Task Name</th>
                <th style={{ textAlign: "center" }}>Agent</th>
                <th style={{ textAlign: "center" }}>Assignee</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Task Type</th>
                <th style={{ textAlign: "center" }}>Date Completed</th>
              </tr>
            </thead>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <UserCompletedItem key={task._id} task={task} authUser={user} />
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
  marginLeft: "400px",
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
