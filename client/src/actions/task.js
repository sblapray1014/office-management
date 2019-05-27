import axios from "axios";

import {
  USER_TASKS,
  BROKERAGE_TASKS,
  TASK_ERROR,
  COMPLETE_TASK,
  GET_TASK,
  UPDATE_TASK
} from "./types";

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

// Get Task by ID
export const getTaskById = _id => async dispatch => {
  try {
    const res = await axios.get(`/api/task/${_id}`);

    dispatch({
      type: GET_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR
    });
  }
};

// Update a Task
export const updateTask = _id => async dispatch => {
  try {
    const res = await axios.post(`/api/task/${_id}`);

    dispatch({
      type: UPDATE_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR
    });
  }
};

// Complete Task
export const completeTask = _id => async dispatch => {
  try {
    const res = await axios.get(`/api/task/${_id}/complete`);

    dispatch({
      type: COMPLETE_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR
    });
  }
};
