import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  authenticated: false,
  cart: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        authenticated: true
      };
    case "ADD_TO_CART":
      // Find out if the item exists
      let item = state.cart.filter(
        item => item.title === action.payload.title
      )[0];

      // If the result of the above filter returns undefined, it does not exist in the cart
      if (item) {
        item.quantity++;
        console.log(state)
        return {... state };
      } else {
        state.cart.push({
          title: action.payload.title,
          price: action.payload.price,
          quantity: 1
        });
        console.log(state)
        return {...state};
      }
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
