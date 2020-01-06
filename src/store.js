import { createStore } from "redux";
import { Provider } from "react-redux";


function reducer(state = { authenticated: false }, action) {
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