import {
  GET_TEMPLATES,
  TEMPLATE_ERROR,
  CREATE_TEMPLATE
} from "../actions/types";

const initialState = {
  templates: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TEMPLATES:
      return {
        ...state,
        templates: payload,
        loading: false
      };
    case TEMPLATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
