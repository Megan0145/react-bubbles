import React, { useState } from "react";
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <Route exact path='/bubble_page' render={props => PrivateRoute(BubblePage, props)} />
      </div>
    </Router>
  );
}

const PrivateRoute = (Component, props) => {
  return localStorage.getItem("token") ? (<Component {...props} />) : (<Redirect to='/' />)
}

export default App;
