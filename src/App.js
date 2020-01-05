import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import store from './ducks/store';

function App() {
  return (
    <Provider store={store}>
      <Switch>
        {/* <Route />
        <Route />
        <Route />
        <Route />
        <Route /> 
        TODO: Routes
        */}
      </Switch>
      </Provider>
  );
}

export default App;
