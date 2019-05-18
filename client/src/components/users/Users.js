import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import { getUsers } from "../../actions/auth";
import { getBrokerages } from "../../actions/brokerages";

const Users = ({
  getUsers,
  getBrokerages,
  auth: { users, loading },
  brokerages: { brokerage }
}) => {
  useEffect(() => {
    getUsers();
    getBrokerages();
    console.log(getBrokerages());
  }, [getUsers]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Agents at </h1>
          <div className="profiles">
            {users.length > 0 ? (
              users.map(user => <UserItem key={user._id} user={user} />)
            ) : (
              <h4>No Agents found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  brokerages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  brokerages: state.brokerages
});

export default connect(
  mapStateToProps,
  { getUsers, getBrokerages }
)(Users);
