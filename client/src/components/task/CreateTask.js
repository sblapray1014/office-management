import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTask } from "../../actions/task";
import { loadUser, getUsers } from "../../actions/auth";

const CreateTask = ({
  createTask,
  getUsers,
  auth: { user, users },
  history,
  match
}) => {
  useEffect(() => {
    loadUser();
    getUsers();
  }, [getUsers, match.params.id]);

  const userId = match.params.id;

  const [formData, setFormData] = useState({
    assignee: "",
    agent: "",
    taskName: "",
    dueDate: "",
    status: "",
    description: "",
    template: "",
    taskType: "",
    notes: ""
  });

  const {
    assignee,
    agent,
    taskName,
    dueDate,
    status,
    description,
    template,
    taskType,
    notes
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const agentArray = [];

  if (users.length > 0) {
    users.map(user => {
      const userObject = {};
      userObject["name"] = user.name;
      userObject["id"] = user._id;
      return agentArray.push(userObject);
    });
  }

  return (
    <Fragment>
      <h1 className="large text-kw">Create A Task</h1>
      <p className="lead">
        This is where you'll create and add tasks that need to be done for
        agents in the office!
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          createTask(userId, formData, history);
          history.push("/tasks/me");
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Task Name"
            name="taskName"
            value={taskName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Agent"
            name="agent"
            value={agent}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Assignee"
            name="assignee"
            value={assignee}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Task Type"
            name="taskType"
            value={taskType}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Due Date</h4>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="status"
            name="status"
            value={status}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="template"
            cols="30"
            rows="5"
            placeholder="Template"
            value={template}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Notes"
            name="notes"
            value={notes}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </Fragment>
  );
};

CreateTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createTask, loadUser, getUsers }
)(CreateTask);
