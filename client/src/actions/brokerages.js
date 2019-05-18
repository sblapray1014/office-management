import axios from "axios";

import { GET_BROKERAGE } from "./types";

// Get Brokerages
export const getBrokerages = () => async dispatch => {
  try {
    const res = await axios.get("/api/brokerage/all");

    dispatch({
      type: GET_BROKERAGE,
      payload: res.data
    });
  } catch (err) {}
};
