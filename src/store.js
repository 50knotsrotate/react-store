import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  authenticated: false,
  cart: []
}


function reducer(state = initialState, action) {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        authenticated: true
      };
    default:
      return state;
    }
    
    
}

const store = createStore(reducer);
export default store;