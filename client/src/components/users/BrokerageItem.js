import React, { Fragment } from "react";

import PropTypes from "prop-types";

const BrokerageItem = ({ brokerage: { name, city, state } }) => {
  return (
    <div>
      <h1 className="large text-kw text-center">Agents at {name}</h1>
    </div>
  );
};

BrokerageItem.propTypes = {
  brokerages: PropTypes.object.isRequired
};

export default BrokerageItem;
