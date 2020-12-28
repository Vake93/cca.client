import React, { useState } from "react";
import Header from "./components/Header/Header";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [message, updateMessage] = useState<string | null>(null);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm updateMessage={updateMessage} />
            </Route>
          </Switch>
          <AlertComponent message={message} updateMessage={updateMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
