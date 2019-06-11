import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createTask } from "../../actions/task";
import { loadUser, getUsers } from "../../actions/auth";
import { getTemplates } from "../../actions/template";

const CreateTask = ({
  createTask,
  getTemplates,
  getUsers,
  auth: { user, users },
  template: { templates },
  history,
  match
}) => {
  useEffect(() => {
    loadUser();
    getUsers();
    getTemplates();
  }, [getUsers, getTemplates, match.params.id]);

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
      <Link
        to="/tasks/me"
        className="btn btn-dark"
        style={{ marginBottom: "20px" }}
      >
        Back To Tasks
      </Link>
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
          <select
            name="template"
            value={template}
            onClick={e => onChange(e)}
            onChange={e => onChange(e)}
            placeholder="Select an Option"
          >
            <option key={template._id}>Please Select a Template</option>
            {templates.length > 0 ? (
              templates.map(template => (
                <option key={template._id} value={template.title}>
                  {template.title}
                </option>
              ))
            ) : (
              <option>No Templates Found</option>
            )}
          </select>
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
  getTemplates: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  template: state.template
});

export default connect(
  mapStateToProps,
  { createTask, loadUser, getUsers, getTemplates }
)(CreateTask);
