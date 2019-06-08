import axios from "axios";

import {
  USER_TASKS,
  BROKERAGE_TASKS,
  TASK_ERROR,
  COMPLETE_TASK,
  GET_TASK,
  UPDATE_TASK,
  CREATE_TASK
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
export const updateTask = id => async dispatch => {
  try {
    const res = await axios.post(`/api/task/${id}`);

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
export const completeTask = (id, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`/api/task/${id}/complete`, formData, config);
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

// Create Task
export const createTask = (id, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`/api/task/${id}`, formData, config);

    dispatch({
      type: CREATE_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR
    });
  }
};
