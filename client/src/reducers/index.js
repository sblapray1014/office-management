import { combineReducers } from "redux";
import auth from "./auth";
import brokerages from "./brokerages";

export default combineReducers({
  auth,
  brokerages
});
