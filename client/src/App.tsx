import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import OAuth from "./components/OAuth/OAuth";
import Events from "./components/Events/Events";
import AuthPage from "./components/AuthPage/AuthPage";
import NewEvent from "./components/Events/NewEvent";

import { Switch, Route, withRouter } from "react-router-dom";
import { UserService } from "./services/UserService";

import "./App.css";
import { Profile } from "./services/Models/User";

function App() {
  const [appInit, setAppInit] = useState(false);
  const [user, setUser] = useState<Profile>();

  UserService.userStateUpdate = (profile) => {
    setUser(profile);
  };

  useEffect(() => {
    UserService.userProfile().then((profile) => {
      UserService.userStateUpdate(profile);
      setAppInit(true);
    });
  }, []);

  if (!appInit) {
    return (
      <div className="App">
        <div className="container d-flex align-items-center flex-column">
          <div className="col-6">
            <div className="alert alert-info mt-2" role="alert">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header user={user} />
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
          <Route path="/" exact={true}>
            <AuthPage user={user}>
              <Events />
            </AuthPage>
          </Route>
          <Route path="/new-event" exact={true}>
            <AuthPage user={user}>
              <NewEvent user={user} />
            </AuthPage>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
