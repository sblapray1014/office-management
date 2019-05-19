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
          <div className="profiles">
            {brokerages.length > 0 ? (
              brokerages.map(brokerage => (
                <BrokerageItem key={brokerage._id} brokerage={brokerage} />
              ))
            ) : (
              <h4>No Brokerage found </h4>
            )}
          </div>
          <UserItem user={users} />
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
