import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getTaskById, completeTask } from "../../actions/task";
import PropTypes from "prop-types";

const ShowTask = ({ getTaskById, completeTask, auth: { task }, match }) => {
  useEffect(() => {
    getTaskById(match.params.id);
    completeTask(match.params.id);
  }, [getTaskById, completeTask, match.params.id]);
  const { taskName, taskType, status, user, templateInfo, brokerage } = task;

  const subject = templateInfo && templateInfo ? templateInfo.subject : null;
  const templateBody = templateInfo && templateInfo ? templateInfo.body : null;
  const type = templateInfo && templateInfo ? templateInfo.type : null;
  const phone = user && user ? user.phone : null;
  const email = user && user ? user.email : null;
  const recipient = user && user ? user.name : null;
  const from = brokerage && brokerage ? brokerage.twilioPhone : null;

  return (
    <div className="single-task">
      <div className="w3-card-4">
        <header className="w3-container w3-light-grey">
          <h1>
            {taskName} to {recipient}
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
              <h5 className="capitalize">Task Status: {status}</h5>
            </div>
            <div className="form-group">
              <h5 className="capitalize">From: TODO MY EMAIL</h5>
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
              <input type="text" name={templateBody} value={templateBody} />
            </div>
          </form>
          <button
            className="btn btn-dark"
            style={{ marginTop: "10px", alignContent: "right" }}
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
