import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import OAuth from "./components/OAuth/OAuth";
import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
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
    return <div className="App">Loading...</div>;
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
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
