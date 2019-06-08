import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTaskById, completeTask } from "../../actions/task";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ShowTask = ({ getTaskById, completeTask, auth: { task }, match }) => {
  useEffect(() => {
    getTaskById(match.params.id);
  }, [getTaskById, match.params.id, completeTask]);

  const {
    _id,
    taskName,
    taskType,
    status,
    agent,
    assignee,
    templateInfo,
    brokerage,
    dueDate
  } = task;

  const subject = templateInfo && templateInfo ? templateInfo.subject : null;
  const body = templateInfo && templateInfo ? templateInfo.body : null;
  const type = templateInfo && templateInfo ? templateInfo.type : null;
  const phone = agent && agent ? agent.phone : null;
  const email = agent && agent ? agent.email : null;
  const recipient = agent && agent ? agent.name : null;
  const from = brokerage && brokerage ? brokerage.twilioPhone : null;

  const formData = {};

  formData.from = from;
  formData.body = body;
  formData.to = email;
  formData.phone = phone;
  formData.subject = subject;

  let today = Date.now();

  return (
    <div className="single-task">
      <Link
        to="/tasks/me"
        className="btn btn-dark"
        style={{ marginBottom: "20px" }}
      >
        Go Back
      </Link>
      <div className="w3-card-4">
        <header className="w3-container w3-light-grey">
          <h1>
            {taskName} for {recipient}
          </h1>
        </header>
        <div
          className="w3-container"
          style={{
            marginTop: "5px",
            paddingBottom: "10px",
            marginBottom: "10px"
          }}
        >
          <form className="form">
            <div className="form-group">
              <h5 className="capitalize">Type of Task: {type}</h5>
            </div>
            <div className="form-group">
              {dueDate ? (
                <h5 style={{ color: "green" }}>
                  {" "}
                  Due Date: <Moment format="MM/DD/YYYY">{dueDate}</Moment>
                </h5>
              ) : null}
            </div>
            <div className="form-group">
              <h5 className="capitalize">Task Status: {status}</h5>
            </div>
            <div className="form-group">
              <h5 className="capitalize">From: {from}</h5>
            </div>
            <div className="form-group">
              <h5 className="capitalize">To: {recipient}</h5>
            </div>
            <div className="form-group">
              <h5>
                {type === "email" ? (
                  <h5>Email: {email}</h5>
                ) : (
                  <h5>Phone: {phone}</h5>
                )}
              </h5>
            </div>
            <div className="form-group">
              {type === "email" ? (
                <div>
                  <h5>Subject: *Only edit if necessary</h5>
                  <input type="email" name={subject} value={subject} />
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <div>
                {type === "email" ? (
                  <h5>Email Message: *Only edit if necessary</h5>
                ) : (
                  <h5>Text Message: *Only edit if necessary</h5>
                )}
              </div>
              <input type="text" name={body} value={body} />
            </div>
          </form>
          <button
            className="btn btn-dark"
            style={{ marginTop: "10px", alignContent: "right" }}
            onClick={e => completeTask(_id, formData)}
          >
            Complete Task
          </button>
        </div>
      </div>
    </div>
  );
};

ShowTask.propTypes = {
  getTaskById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getTaskById, completeTask }
)(ShowTask);
