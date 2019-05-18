import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserItem from "./UserItem";
import BrokerageItem from "./BrokerageItem";
import Spinner from "../layout/Spinner";
import { getUsers, getBrokerages } from "../../actions/auth";

const Users = ({
  getUsers,
  getBrokerages,
  auth: { users, brokerages, loading }
}) => {
  useEffect(() => {
    getUsers();
    getBrokerages();
  }, [getUsers]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div classname="profiles">
            {brokerages.length > 0 ? (
              brokerages.map(brokerage => (
                <BrokerageItem key={brokerage._id} brokerage={brokerage} />
              ))
            ) : (
              <h4>No Brokerage found </h4>
            )}
          </div>
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUsers, getBrokerages }
)(Users);
