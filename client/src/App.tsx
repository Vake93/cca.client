import React from "react";
import Header from "./components/Header/Header";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import OAuth from "./components/OAuth/OAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/register" exact={true}>
              <Registration />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/oauth" exact={true}>
              <OAuth />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
