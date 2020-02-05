import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import FaLock from './components/Cards/FaCard/FaCard';
import store from './store';

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/cart" component={() => <p>Cart</p>} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
