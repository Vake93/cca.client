import React from "react";
import Header from "./components/Header/Header";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
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
              <RegistrationForm />
            </Route>
            <Route path="/login" exact={true}>
              <LoginForm />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
