import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <Fragment>
      <NavBar />
    </Fragment>
  );
}

export default App;
