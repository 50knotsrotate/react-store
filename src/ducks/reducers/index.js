import { UPDATE_USERNAME } from "../constants/action-types";

const initialState = {
  username: "",
  password: ""
};

function rootReducer(state = initialState, action) {
    const { payload } = action;
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...initialState,
        username: payload
      };
    default:
      return state;
  }
}

export default rootReducer;
