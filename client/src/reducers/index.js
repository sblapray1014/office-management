import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import template from "./template";

export default combineReducers({
  auth,
  alert,
  template
});
