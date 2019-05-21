import axios from "axios";

import { USER_TASKS, BROKERAGE_TASKS, TASK_ERROR } from "./types";

// Get Logged in Users Tasks
export const getUserTasks = () => async dispatch => {
  try {
    const res = await axios.get("/api/task");

    dispatch({
      type: USER_TASKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR
    });
  }
};

// Get Tasks by Brokerage
export const getBrokerageTasks = () => async dispatch => {
  try {
    const res = await axios.get("/api/task/brokerage");

    dispatch({
      type: BROKERAGE_TASKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR
    });
  }
};
