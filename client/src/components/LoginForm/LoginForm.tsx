import React, { useState } from "react";
import { Validator } from "../../services/Validator";
import { UserService } from "../../services/UserService";
import { LoginResult } from "../../services/Models/Login";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ history }: RouteComponentProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editable, setEditable] = useState(true);
  const [state, setState] = useState({
    email: "",
    password: "",
    rememberPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setEditable(false);

    if (validateData()) {
      UserService.loginUser(state)
        .then(loginDone)
        .finally(() => {
          setEditable(true);
        });
    } else {
      setEditable(true);
    }
  };

  const loginDone = (e: LoginResult) => {
    if (!e.success && e.errorMessage) {
      setErrorMessage(e.errorMessage);
      return;
    }

    history.push("/");
  };

  const validateData = (): boolean => {
    setErrorMessage(null);

    if (!Validator.validateEmail(state.email)) {
      setErrorMessage("Invalid email address");
      return false;
    }

    if (state.password.length === 0) {
      setErrorMessage("Password is required");
      return false;
    }

    return true;
  };

  const handleClearClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setState({
      email: "",
      password: "",
      rememberPassword: false,
    });
  };

  return (
    <div className="card col-6 login-card">
      <form>
        <div className="form-group text-left">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={state.email}
            readOnly={!editable}
          />
        </div>

        <div className="form-group text-left">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={state.password}
            readOnly={!editable}
          />
        </div>

        <div className="hv-center">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginRight: "5px", width: "100px" }}
            onClick={handleClearClick}
            disabled={!editable}
          >
            Clear
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: "5px", width: "100px" }}
            onClick={handleSubmitClick}
            disabled={!editable}
          >
            Login
          </button>
        </div>
      </form>
      <div
        className="alert alert-danger mt-2"
        style={{ display: errorMessage ? "block" : "none" }}
        role="alert"
      >
        {errorMessage}
      </div>

      <div className="mt-2" style={{ paddingBottom: "5px" }}>
        <span>Don't have an account? </span>
        <span className="register-text" onClick={() => history.push("/register")}>
          Register here
        </span>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
