import axios from "axios";
import {
  GET_TEMPLATES,
  GET_TEMPLATE,
  CREATE_TEMPLATE,
  TEMPLATE_ERROR
} from "./types";

export const getTemplates = () => async dispatch => {
  try {
    const res = await axios.get("/api/template");

    dispatch({
      type: GET_TEMPLATES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TEMPLATE_ERROR
    });
  }
};
