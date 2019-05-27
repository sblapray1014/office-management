import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  GET_USERS,
  USERS_ERROR,
  GET_BROKERAGES,
  USER_TASKS,
  BROKERAGE_TASKS,
  TASK_ERROR,
  COMPLETE_TASK,
  GET_TASK,
  UPDATE_TASK
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  users: [],
  brokerages: {},
  tasks: {},
  task: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        isAuthenticated: true,
        users: payload,
        loading: false
      };
    case GET_BROKERAGES:
      return {
        ...state,
        brokerages: payload,
        loading: false,
        isAuthenticated: true
      };
    case USER_TASKS:
    case BROKERAGE_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
        isAuthenticed: true
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case USERS_ERROR:
    case TASK_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      };
    case COMPLETE_TASK:
    case GET_TASK:
    case UPDATE_TASK:
      return {
        ...state,
        task: payload,
        loading: false,
        isAuthenticated: true
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
