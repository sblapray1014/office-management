import {
  USER_TASKS,
  BROKERAGE_TASKS,
  TASK_ERROR,
  COMPLETE_TASK,
  GET_TASK,
  UPDATE_TASK,
  CREATE_TASK
} from "../actions/types";

const initialState = {
  loading: true,
  tasks: [],
  task: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_TASKS:
    case BROKERAGE_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false
      };
    case COMPLETE_TASK:
    case GET_TASK:
    case UPDATE_TASK:
      return {
        ...state,
        task: payload,
        loading: false
      };
    case CREATE_TASK:
      return {
        ...state,
        task: payload,
        loading: false,
        isAuthenticated: true
      };
    case TASK_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
