import { GET_BROKERAGE } from "../actions/types";

const initialState = {
  brokerage: {},
  loading: true,
  isAuthenticated: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BROKERAGE:
      return {
        ...state,
        brokerage: payload,
        loading: false,
        isAuthenticated: true
      };
    default:
      return state;
  }
}
