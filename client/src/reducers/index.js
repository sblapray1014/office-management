import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import template from "./template";
import task from "./task";

export default combineReducers({
  auth,
  alert,
  template,
  task
});
