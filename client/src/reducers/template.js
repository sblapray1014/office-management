import {
  GET_TEMPLATES,
  GET_TEMPLATE,
  TEMPLATE_ERROR,
  CREATE_TEMPLATE
} from "../actions/types";

const initialState = {
  templates: [],
  template: {},
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
    case GET_TEMPLATE:
      return {
        ...state,
        template: payload,
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
