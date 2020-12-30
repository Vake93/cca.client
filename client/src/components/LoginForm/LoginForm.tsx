import React, { useState } from "react";
import { Validator } from "../../services/Validator";
import { UserService } from "../../services/UserService";
import { LoginResult } from "../../services/Models/Login";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./LoginForm.css";

import googleIcon from "../../assets/google.svg";
import microsoftIcon from "../../assets/microsoft.svg";

function LoginForm({ history }: RouteComponentProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editable, setEditable] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prevState) => ({
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
      UserService.loginUser(loginData)
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

  const handleClearClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoginData({
      email: "",
      password: "",
      rememberPassword: false,
    });
  };

  const handleOAuth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setEditable(false);

    const { id: provider } = e.target as HTMLButtonElement;

    UserService.getAuthUrl(provider).then(
      (url) => (window.location.href = url)
    );
  };

  const validateData = (): boolean => {
    setErrorMessage(null);

    if (!Validator.validateEmail(loginData.email)) {
      setErrorMessage("Invalid email address");
      return false;
    }

    if (loginData.password.length === 0) {
      setErrorMessage("Password is required");
      return false;
    }

    return true;
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
            value={loginData.email}
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
            value={loginData.password}
            readOnly={!editable}
          />
        </div>

        <div className="hv-center">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginRight: "5px", height: "40px", width: "100px" }}
            onClick={handleClearClick}
            disabled={!editable}
          >
            Clear
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: "5px", height: "40px", width: "100px" }}
            onClick={handleSubmitClick}
            disabled={!editable}
          >
            Login
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>Login with a different account?</label>
        </div>
        <div>
          <button
            id="Google"
            type="button"
            className="btn btn-light"
            style={{ marginRight: "5px" }}
            onClick={handleOAuth}
            disabled={!editable}
          >
            <span>
              <img
                id="Google"
                alt="google-icon"
                src={googleIcon}
                style={{ height: "40px", width: "40px" }}
              />
            </span>
            Google
          </button>

          <button
            id="Microsoft"
            type="button"
            className="btn btn-light"
            style={{ marginLeft: "5px" }}
            onClick={handleOAuth}
            disabled={!editable}
          >
            <span>
              <img
                id="Microsoft"
                alt="microsoft-icon"
                src={microsoftIcon}
                style={{ height: "40px", width: "40px" }}
              />
            </span>
            Microsoft
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
        <span
          className="register-text"
          onClick={() => history.push("/register")}
        >
          Register here!
        </span>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
