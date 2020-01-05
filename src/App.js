import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar'
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  return (
    <Fragment>
      <NavBar />
      <MainHeader />
    </Fragment>
  );
}

export default App;
