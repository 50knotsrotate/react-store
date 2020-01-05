import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from './components/Home/Home';
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/signup" component={MainHeader} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
